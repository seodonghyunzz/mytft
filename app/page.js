import Ranking from "./component/ranking";
import Favorites from "./component/favorites";
export default async function Home() {

  return (
    <div className="page">
      <section className="main_section">
        <Favorites/>
        <Ranking/>
      </section>
    </div>
  )
}
