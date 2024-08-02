// @ts-nocheck
import { useState, useEffect } from "react";
import { Card, Space, Input, message, Button } from "antd";
import axios from "axios";
const { TextArea } = Input;
import { objectToList, listToObject } from "@/helperFunctions/toggleObjectList";

const FooterInfo = ({ pageToEdit }) => {
  const [details, setDetails] = useState({
    about_us: "",
    location: "",
    quick_links: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getHomeDetails = async () => {
      const { data } = await axios.get("/base_page/footer_info");

      if (data.details) {
        setDetails({
          ...data.details.footer_info,
          quick_links: listToObject(data.details.footer_info.quick_links),
        });
      }
    };
    if (pageToEdit == "FooterInfo") {
      getHomeDetails();
    }
  }, [pageToEdit]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const links_in_list_format = objectToList(details.quick_links);

      const dataToSubmit = { ...details, quick_links: links_in_list_format };
      // console.log(dataToSubmit);
      const { data } = await axios.post("/base_page/footer_info", {
        details: dataToSubmit,
      });

      if (data.ok) {
        message.success("Details successfully submitted");
      } else {
        message.error(
          "Could not successfully submit the details, try again later!"
        );
      }
    } catch (err) {
      message.error(
        'The format of the "quick Links" section is incorrect. Note, it cannot be blank'
      );
    }
    setLoading(false);
  };
  return (
    <div>
      <Space direction="vertical" size={24}>
        <Card
          title="ABOUT US"
          style={{
            width: "70vw",
            background: "blue",
          }}
        >
          <br />
          <TextArea
            rows={4}
            value={details.about_us}
            onChange={(e) =>
              setDetails({
                ...details,
                about_us: e.target.value,
              })
            }
          />
        </Card>

        <Card
          title="OUR LOCATION"
          style={{
            width: "70vw",
            background: "blue",
          }}
        >
          <br />

          <TextArea
            rows={4}
            value={details.location}
            onChange={(e) =>
              setDetails({
                ...details,
                location: e.target.value,
              })
            }
          />
        </Card>

        <Card
          title="QUICK LINKS"
          style={{
            width: "70vw",
            background: "blue",
          }}
        >
          <br />
          <TextArea
            placeholder='{"Link name": "Link URL"}, {"Link name": "Link URL"}'
            rows={4}
            value={details.quick_links}
            onChange={(e) =>
              setDetails({
                ...details,
                quick_links: e.target.value,
              })
            }
          />
        </Card>
      </Space>
      <Button className="publish" onClick={handleSubmit} loading={loading}>
        submit
      </Button>
    </div>
  );
};

export default FooterInfo;
