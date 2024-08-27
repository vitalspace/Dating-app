import axios from "./axios";

export const singUp = async (body: any) => {
  await axios.post("/signup", body);
};

export const singIn = async (body: any) => {
  await axios.post("/signin", body);
};


