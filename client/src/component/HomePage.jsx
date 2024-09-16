import HeroSectionOne from "./section/HeroSectionOne";
import LoginForm from "./form/LoginForm";

function HomePage() {
  return (
    <div>
      <div className="container-fluid" style={{ height: "100vh" }}>
        <div className="row h-100">
          <div className="col-sm-12 col-md-8 d-flex justify-content-center text-light align-items-center bgPrimary">
            <HeroSectionOne />
          </div>
          <div className="col-sm-12 col-md-4 d-flex justify-content-center align-items-center bgBackground">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
