export default function Main(props){
    const { data } = props;
    return (
        <div className="imgContainer"><img src={data?.hdurl} alt="This is mars demo picture" className="bgImage" /></div>
        
    )
        
}