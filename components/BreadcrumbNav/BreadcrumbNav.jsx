import { useRouter } from 'next/router';
import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Router } from 'react-router-dom';

const BreadcrumbNav = ({ page }) => {
  const router = useRouter();

  return (
    <>
      <Breadcrumb className='FW-medium FS-14'>
        <Breadcrumb.Item href="/" className='text-capitalize'>Home</Breadcrumb.Item>
        {router.pathname === `/news` || router.pathname === `/newsDetail` ? <Breadcrumb.Item href="/news" className='text-capitalize'>
         News
        </Breadcrumb.Item> 
        :router.pathname === `/blogListing` || router.pathname === `/blogDetail` ? <Breadcrumb.Item href="/blogListing" className='text-capitalize'>
        Blogs
        </Breadcrumb.Item> :router.pathname === `/solarOptionPage` ? <Breadcrumb.Item className='text-capitalize'>Home options
        </Breadcrumb.Item>:router.pathname === `/Compositetoilets` ? <Breadcrumb.Item className='text-capitalize'>Services </Breadcrumb.Item>
        :router.pathname === `/MaterialFinishes` ? <Breadcrumb.Item className='text-capitalize'>Home options </Breadcrumb.Item>
        :router.pathname === `/LandSaleExperts` ? <Breadcrumb.Item className='text-capitalize'>Services </Breadcrumb.Item>
        :router.pathname === `/preferredContractors` ? <Breadcrumb.Item className='text-capitalize'>Services</Breadcrumb.Item>
        :router.pathname === `/financing` ? <Breadcrumb.Item className='text-capitalize'>services</Breadcrumb.Item>
        :router.pathname === `/requestInformation` ?<Breadcrumb.Item className='text-capitalize'>Tiny Homes </Breadcrumb.Item>
         :router.pathname === `/contentpage` ?<Breadcrumb.Item className='text-capitalize'>Homes </Breadcrumb.Item>
        : <Breadcrumb.Item href="/searchListing" className='text-capitalize'>
          Search listing
          
        </Breadcrumb.Item>}

        <Breadcrumb.Item active className='text-capitalize'>{page}</Breadcrumb.Item>
      </Breadcrumb>
    </>
  )
}

export default BreadcrumbNav