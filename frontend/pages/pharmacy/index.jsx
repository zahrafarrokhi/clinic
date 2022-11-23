import React from 'react'
import Navigation from '../../components/navigation/Navigation';
import Header from '../../components/pharmacy/Header';

export default function Pharmacy() {
  return (
    <div className='px-6 py-4'>
      <Header state="delivery"/>
      

    </div>
  )
}


Pharmacy.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};