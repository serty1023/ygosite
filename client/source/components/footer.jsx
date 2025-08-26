import { useState,useEffect,useContext } from "react";
import { LanguageContext } from "./language";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import "../style/footer.css";

function Footer()
{
    const { language } = useContext(LanguageContext);
    const [footerContent,getFooterContent] = useState([]);

    useEffect(() =>
    {
        fetch("http://localhost:3000/interface")
        .then(response => response.json())
        .then(data => getFooterContent(data["footer"].footer))
    },[]);

    return (
    <>
        <div className="footer">
            <div className="contact">
                <h1>
                    {footerContent[language]}
                </h1>
                <div className="contact-information">
                    <p onClick={() => window.open("https://www.facebook.com/mai.luong.bac" , "_blank")}>
                        <FontAwesomeIcon icon={faSquareFacebook}/> Mai Lương Bắc
                    </p>
                    <p onClick={() => window.open("https://mail.google.com/mail/?view=cm&fs=1&to=serty1023@gmail.com" , "_blank")}>
                        <FontAwesomeIcon icon={faEnvelope}/> serty1023@gmail.com
                    </p>
                </div>
            </div>
        </div>
    </>);
};

export default Footer;