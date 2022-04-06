const checkMetamask = () => {
  console.log("Checking metamask...");

  if (typeof window.ethereum !== "undefined") {
    console.log("Metamask installed");

    return true;
  } else {
    console.log("Metamask not installed");
    return false;
  }
};

const InstallMetamask = () => {
  return (
    <div
      id="metamask-install-container"
      className="flex justify-center text-center bg-gray-600 rounded-xl py-4 px-4 md:px-1 text-gray-100 shadow-md text-sm md:text-lg"
    >
      <h3>Metamask is not installed, to download 👇🏼</h3>
      <a href="https://metamask.io/download.html">Meta Mask</a>
    </div>
  );
};

export { checkMetamask, InstallMetamask };
