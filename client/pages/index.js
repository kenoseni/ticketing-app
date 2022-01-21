import axios from "axios";

const LandingPage = ({ currentUser }) => {
  return <h1>Landing page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    // we are on the server
    //  kubectl get namespaces
    // kubectl get services -n ingress-nginx
    // use http://service-name.namespace.svc.cluster.local
    const { data } = await axios
      .get(
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
        {
          headers: req.headers,
        }
      )
      .catch((error) => console.log(error));
    return data;
  } else {
    // we are on the browser
    const { data } = await axios
      .get("/api/users/currentuser")
      .catch((error) => console.log(error));
    return data;
  }
};

export default LandingPage;
