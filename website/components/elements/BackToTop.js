
export default function BackToTop({ scroll }) {

    return (
        <>
            {scroll && (
                <a className="scroll-top scroll-to-target" href="#top" style={{backgroundColor:'#2c9497'}}>
                    <i className="flaticon-up-arrow"></i>
                </a>
                
            )}
        </>
    )
}