import { ColorRing } from "react-loader-spinner";

const AddUpdateLoader = () => {
  return (
    <>
      <ColorRing
        visible={true}
        height="25"
        width="25"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#808080", "#808080", "#808080", "#808080", "#808080"]}
      />
    </>
  );
};

export default AddUpdateLoader;
