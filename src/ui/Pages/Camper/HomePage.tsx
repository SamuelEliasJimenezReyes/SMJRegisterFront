import CreateCamperForm from "../../components/Camper/CreateCamperForm";

const HomePage = () => {
  return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-8">Registro de Campistas</h1>
          <CreateCamperForm />
        </div>
      </div>
  );
};

export default HomePage;