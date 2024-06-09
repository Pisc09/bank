import CardsFeature from "../CardFeature/CardFeature";
import chat from "../../../../designs/img/icon-chat.png";
import money from "../../../../designs/img/icon-money.png";
import security from "../../../../designs/img/icon-security.png";
import "../../../../designs/css/main.css";

function Features() {
  return (
    <section className="features">
      <CardsFeature
        imgSrc={chat}
        altText="Icône Chat"
        title="You are our #1 priority"
        paragraph="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
      />
      <CardsFeature
        imgSrc={money}
        altText="Icône Money"
        title="More savings means higher rates"
        paragraph="The more you save with us, the higher your interest rate will be!"
      />
      <CardsFeature
        imgSrc={security}
        altText="Icône Security"
        title="Security you can trust"
        paragraph="We use top of the line encryption to make sure your data and money is always safe."
      />
    </section>
  );
}
export default Features;
