import userApi from "./user";
import homesApi from "./homes";

export default (alogliaConfig) => {
  return {
    user: userApi(alogliaConfig),
    homes: homesApi(alogliaConfig),
  };
};
