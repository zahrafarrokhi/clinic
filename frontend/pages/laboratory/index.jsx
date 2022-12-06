
import Navigation from '../../components/navigation/Navigation';
import Header from '../../components/pharmacy/Header';
export default function Laboratory() {
  return (
    <div className='px-6 py-4'>
      <Header state="status"/>
      </div>
      )
}


Laboratory.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};