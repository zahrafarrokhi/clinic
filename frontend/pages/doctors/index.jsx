import Head from "next/head";
import Image from "next/image";
import Navigation from "../../components/navigation/Navigation";

function Doctors() {
  return (
    <div>

    </div>
  );
}

Doctors.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};

export default Doctors;
