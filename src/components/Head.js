import astronaut from "../img/astronaut.jpg";

export default function Head() {
  return (
    <div className="flex justify-center w-full bg-gray-600 shadow-md object-contain">
      <img
        className="p-10 object-contain h-48 w-96"
        src={astronaut}
        alt="astronaut image in a pixel form"
      />
    </div>
  );
}
