import React from "react";
import { Form, Segment, Image, Icon, Header } from "semantic-ui-react";

function ImageContainer({
  highlighted,
  setHighlighted,
  mediaPreview,
  setMediaPreview,
  setMedia,
  inputRef,
  handleChange,
}) {
  return (
    <>
      <Form.Field>
        <Segment placeholder basic secondary>
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            name="media"
            onChange={handleChange}
            ref={inputRef}
          />

          <div
            onDragOver={(event) => {
              event.preventDefault();

              setHighlighted(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();

              setHighlighted(false);
            }}
            onCrop={(event) => {
              event.preventDefault();

              setHighlighted(true);

              const droppedFile = Array.from(event.dataTransfer.files);
              setMedia(droppedFile[0]);
              setMediaPreview(URL.createObjectURL(droppedFile[0]));
            }}
          >
            {mediaPreview === null ? (
              <>
                <Segment color={highlighted ? "green" : "grey"} placeholder basic>
                  <Header icon>
                    <Icon
                      name="file image outline"
                      style={{ cursor: "pointer" }}
                      onClick={() => inputRef.current.click()}
                    />
                    Drag n Drop or Click To Upload Image
                  </Header>
                </Segment>
              </>
            ) : (
              <>
                <Segment color="green" placeholder basic>
                  <Image
                    src={mediaPreview}
                    size="medium"
                    centered
                    style={{ cursor: "pointer" }}
                    onClick={() => inputRef.current.click()}
                  />
                </Segment>
              </>
            )}
          </div>
        </Segment>
      </Form.Field>
    </>
  );
}

export default ImageContainer;
