import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";

function TicketingApp({ Component, pageProps, currentUser }) {
  return (
    <div>
      {currentUser.email}
      <Component {...pageProps} />
    </div>
  );
}

TicketingApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser").catch((error) => {
    console.log(error);
  });
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    // currentUser: data.currentUser,
    ...data,
  };
};

export default TicketingApp;
