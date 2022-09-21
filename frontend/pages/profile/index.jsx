import Head from "next/head";
import Image from "next/image";
import Navigation from "../../components/navigation/Navigation";
import TabComponent from "../../components/ProfileFields/TabComponent";

function Profile() {
  return (
    <div className="mx-auto w-[85%] py-4">
      <TabComponent/>
    </div>
  );
}

Profile.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};

export default Profile;
