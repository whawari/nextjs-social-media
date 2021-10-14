import React, { useState, useEffect } from "react";
import { List, Image, Search } from "semantic-ui-react";
import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";
import baseUrl from "../../utils/baseUrl";

let cancel;

function SearchComponent() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleChange = async (event) => {
    const { value } = event.target;
    setText(value);

    if (value.length === 0) return;

    if (value.trim().length === 0) return;

    setLoading(true);

    try {
      cancel && cancel();

      const CancelToken = axios.CancelToken;
      const token = cookie.get("token");

      const res = await axios.get(`${baseUrl}/api/search/${value}`, {
        headers: { Authorization: token },
        cancelToken: new CancelToken((canceler) => {
          cancel = canceler;
        }),
      });

      if (res.data.length === 0) {
        results.length > 0 && setResults([]);

        return setLoading(false);
      }

      setResults(res.data);
    } catch (error) {
      console.log("Error Searching");

      setLoading(false);
    }
  };

  useEffect(() => {
    if (text.length === 0 && loading) return setLoading(false);
  }, [text]);

  return (
    <Search
      loading={loading}
      onResultSelect={(event, data) => {
        Router.push(`/${data.result.username}`);
      }}
      onSearchChange={handleChange}
      resultRenderer={resultRenderer}
      results={results}
      value={text}
      onBlur={() => {
        results.length > 0 && setResults([]);
        loading && setLoading(false);
        setText("");
      }}
    />
  );
}

const resultRenderer = ({ _id, profilePicUrl, name }) => {
  return (
    <List key={_id}>
      <List.Item>
        <Image src={profilePicUrl} alt="ProfilePic" avatar />

        <List.Content header={name} as="a" />
      </List.Item>
    </List>
  );
};

export default SearchComponent;
