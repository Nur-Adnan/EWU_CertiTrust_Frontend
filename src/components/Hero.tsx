import "./Hero.css";
export default function HeroSectionSimpleCentred() {
  return (
    <>
      {/* Hero */}
      <div>
        <div className="card-container">
          <div className="card">
            <img
              src="https://petapixel.com/assets/uploads/2022/12/what-is-unsplash.jpg"
              alt="Image description"
              className="card-image"
              width="200"
              height="300"
            />
            <div className="layers">
              <div className="layer"></div>
              <div className="layer"></div>
              <div className="layer"></div>
              <div className="layer"></div>
              <div className="layer"></div>
              <div className="layer"></div>
              <div className="layer"></div>
              <div className="layer"></div>
              <div className="layer"></div>
              <div className="layer"></div>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
