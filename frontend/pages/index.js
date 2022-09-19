import { Button } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import LoginLayout from "../components/LoginLayout";
import Navigation from "../components/navigation/Navigation";
import styles from "../styles/Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <h1 className="text-primary text-light">Tailwind</h1>
      <Button variant="contained" color="primary">
        Mui
      </Button>
      <Button variant="contained" color="secondary">
        Mui2
      </Button>
    </div>
  );
}

Home.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};

export default Home;
