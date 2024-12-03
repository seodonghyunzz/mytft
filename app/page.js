import Header from "./header/page";
import Banner from "./component/banner";
import Ranking from "./component/ranking";
export default async function Home() {

  return (
    <div className="page">
      <section className="header_section">
        <Header/>
        <Banner/>
      </section>
      <section className="main_section">
        <Ranking/>
        <p>main contents</p>
      </section>
      <section className="footer_section">
        <p>footer</p>
      </section>
    </div>
  )
}
