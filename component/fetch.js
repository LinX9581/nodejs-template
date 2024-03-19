import axios from "axios";
import FormData from "form-data";
import fs from "fs";

// pushFile();
async function pushFile() {
  try {
    const data = new FormData();
    data.append("file", fs.createReadStream("./1.mp3"));

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:3007/file/getfile",
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };

    const response = await axios.request(config);
  } catch (error) {
    console.log(error);
  }
};

