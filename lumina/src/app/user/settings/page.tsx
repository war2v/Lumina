import Header from "../../../components/custom/general/header";
import UpdateUserForm from "./_compenents/UpdateUserForm";

const SettingsPage = () => {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center w-full h-full mt-10">
        <UpdateUserForm />
      </div>
    </div>
  );
};

export default SettingsPage;
