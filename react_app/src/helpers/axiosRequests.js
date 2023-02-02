import axios from "axios";

const baseurl = "http://ec2-52-66-177-17.ap-south-1.compute.amazonaws.com:4500";

const token = localStorage.getItem("jwt_token");

export const authAxios = axios.create({
  baseURL: baseurl,
  headers: {
    Authorization: token,
  },
});

export const axiosGet = async (endpoint) => {
  try {
    const url = `${baseurl}${endpoint}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const axiosPost = async (endpoint, data) => {
  try {
    const url = `${baseurl}${endpoint}`;
    const res = await axios.post(url, data, {
      headers: {
        Authorization: token,
      },
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const axiosPatch = async (endpoint, data) => {
  try {
    const url = `${baseurl}${endpoint}`;
    const res = await axios.patch(url, data, {
      headers: {
        Authorization: token,
      },
    });
    return res;
  } catch (error) {
    return error.response;
  }
};
