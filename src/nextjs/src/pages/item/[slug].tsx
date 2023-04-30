import ItemDetail from '../../components/ItemDetail'
import { ResultEntity } from '../../models/entity'

export async function getServerSideProps(context: any) {

    const { req, res } = context
    // const cookies = req.headers.cookie;

    // const id = context.params.id // Get ID from slug `/book/1`
    let itemDetail: ResultEntity = {
        data: null,
        status: "0000",
        message: "",
        isError: true
    };

    console.log(req.method)

    console.log(context.params.slug) // [slug].tsx
    console.log(context.query) // contain any query parameter passed in the URL
    
    itemDetail = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PROXY}/items/result/${context.params.slug}`, {
        method: 'GET'
    })
    .then((response) => {
        return response.json().then(value => value)
    })
    // .catch(error => {
    //     console.log(error)
    // })

    // if(_res.status === 200) {
    //     itemDetail = await _res.json().then(value => value)
    // }    
  
    return {
      props: { 
        itemDetail: itemDetail
      },
    }
}

const ItemView = ({ itemDetail }:{ itemDetail: ResultEntity}) => {

    if(itemDetail.isError) {

        return(
            <>
                <div className="container mx-auto h-[500px] flex justify-center item-center">
                    <h2 className="text-4xl">No item found</h2>
                </div>
            </>
        )

    }

    return(
        <>
            <div className="container mx-auto">
                <ItemDetail detail={itemDetail.data} />
            </div>
        </>
    )

}

export default ItemView