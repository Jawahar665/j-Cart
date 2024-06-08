import { Helmet } from 'react-helmet-async'

const MetaData = ({title}) => {
  return (
    <Helmet>
      <title>{`${title}-J Cart`}</title>
   </Helmet>
  
  
  )
}

export default MetaData