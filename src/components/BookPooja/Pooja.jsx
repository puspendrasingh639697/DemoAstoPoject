import React from "react";
import Premmandir from "../../assets/image/Premmandir.png";
import Takshkeshwer from "../../assets/image/Takshkeshwer.png";
import BankeBihari from "../../assets/image/BankeBihari.png";
import Kalbherav from "../../assets/image/Kalbherav.png";

const Pooja = () => {
  // Array of objects containing the data for each div
  const sections = [
    {
      imgSrc: Premmandir,
      heading: "Prem Mandir",
      subheading: "Vrindavan, Uttar Pradesh",
      content:
        "A huge building has been constructed for satsang in the temple, in which 25000 people can sit together. The walls of the sanctum sanctorum are 8 feet thick to bear.",
    },
    {
      imgSrc: BankeBihari,
      heading: "Banke Bihari Temple",
      subheading: "Vrindavan, Uttar Pradesh",
      content: `The construction of Banke Bihari Temple was done in 1864 by Swami Haridas. Swami Haridas was a devoted devotee of Lord Krishna.`,
    },
    {
      imgSrc: Kalbherav,
      heading: "Shri Kalabhairav ​​Temple",
      subheading: "Ujjain, Madhya Pradesh",
      content:
        "In this temple of Bhairav Baba, alcohol is offered to him, but where the alcohol goes, this has remained a mystery today.",
    },
    {
      imgSrc: Takshkeshwer,
      heading: "Takshkeshwer Nath Temple",
      subheading: "Prayagraj, Uttar Pradesh",
      content: `It is a belief that two decades ago, the presence of snakes at the Takshakeshwar Nath temple increased significantly during the month of Sawan.`,
    },
    {
      imgSrc: Premmandir,
      heading: "Prem Mandir",
      subheading: "Vrindavan, Uttar Pradesh",
      content:
        "A huge building has been constructed for satsang in the temple, in which 25000 people can sit together. The walls of the sanctum sanctorum are 8 feet thick to bear.",
    },
    {
      imgSrc: BankeBihari,
      heading: "Banke Bihari Temple",
      subheading: "Vrindavan, Uttar Pradesh",
      content: `The construction of Banke Bihari Temple was done in 1864 by Swami Haridas. Swami Haridas was a devoted devotee of Lord Krishna.`,
    },
    {
      imgSrc: Kalbherav,
      heading: "Shri Kalabhairav ​​Temple",
      subheading: "Ujjain, Madhya Pradesh",
      content:
        "In this temple of Bhairav Baba, alcohol is offered to him, but where the alcohol goes, this has remained a mystery today.",
    },
    {
      imgSrc: Takshkeshwer,
      heading: "Takshkeshwer Nath Temple",
      subheading: "Prayagraj, Uttar Pradesh",
      content: `It is a belief that two decades ago, the presence of snakes at the Takshakeshwar Nath temple increased significantly during the month of Sawan.`,
    },
    {
      imgSrc: Premmandir,
      heading: "Prem Mandir",
      subheading: "Vrindavan, Uttar Pradesh",
      content:
        "A huge building has been constructed for satsang in the temple, in which 25000 people can sit together. The walls of the sanctum sanctorum are 8 feet thick to bear.",
    },
    {
      imgSrc: BankeBihari,
      heading: "Banke Bihari Temple",
      subheading: "Vrindavan, Uttar Pradesh",
      content: `The construction of Banke Bihari Temple was done in 1864 by Swami Haridas. Swami Haridas was a devoted devotee of Lord Krishna.`,
    },
    {
      imgSrc: Kalbherav,
      heading: "Shri Kalabhairav ​​Temple",
      subheading: "Ujjain, Madhya Pradesh",
      content:
        "In this temple of Bhairav Baba, alcohol is offered to him, but where the alcohol goes, this has remained a mystery today.",
    },
    {
      imgSrc: Takshkeshwer,
      heading: "Takshkeshwer Nath Temple",
      subheading: "Prayagraj, Uttar Pradesh",
      content: `It is a belief that two decades ago, the presence of snakes at the Takshakeshwar Nath temple increased significantly during the month of Sawan.`,
    },
    {
      imgSrc: Premmandir,
      heading: "Prem Mandir",
      subheading: "Vrindavan, Uttar Pradesh",
      content:
        "A huge building has been constructed for satsang in the temple, in which 25000 people can sit together. The walls of the sanctum sanctorum are 8 feet thick to bear.",
    },
    {
      imgSrc: BankeBihari,
      heading: "Banke Bihari Temple",
      subheading: "Vrindavan, Uttar Pradesh",
      content: `The construction of Banke Bihari Temple was done in 1864 by Swami Haridas. Swami Haridas was a devoted devotee of Lord Krishna.`,
    },
    {
      imgSrc: Kalbherav,
      heading: "Shri Kalabhairav ​​Temple",
      subheading: "Ujjain, Madhya Pradesh",
      content:
        "In this temple of Bhairav Baba, alcohol is offered to him, but where the alcohol goes, this has remained a mystery today.",
    },
    {
      imgSrc: Takshkeshwer,
      heading: "Takshkeshwer Nath Temple",
      subheading: "Prayagraj, Uttar Pradesh",
      content: `It is a belief that two decades ago, the presence of snakes at the Takshakeshwar Nath temple increased significantly during the month of Sawan.`,
    },
    {
      imgSrc: Premmandir,
      heading: "Prem Mandir",
      subheading: "Vrindavan, Uttar Pradesh",
      content:
        "A huge building has been constructed for satsang in the temple, in which 25000 people can sit together. The walls of the sanctum sanctorum are 8 feet thick to bear.",
    },
    {
      imgSrc: BankeBihari,
      heading: "Banke Bihari Temple",
      subheading: "Vrindavan, Uttar Pradesh",
      content: `The construction of Banke Bihari Temple was done in 1864 by Swami Haridas. Swami Haridas was a devoted devotee of Lord Krishna.`,
    },
    {
      imgSrc: Kalbherav,
      heading: "Shri Kalabhairav ​​Temple",
      subheading: "Ujjain, Madhya Pradesh",
      content:
        "In this temple of Bhairav Baba, alcohol is offered to him, but where the alcohol goes, this has remained a mystery today.",
    },
    {
      imgSrc: Takshkeshwer,
      heading: "Takshkeshwer Nath Temple",
      subheading: "Prayagraj, Uttar Pradesh",
      content: `It is a belief that two decades ago, the presence of snakes at the Takshakeshwar Nath temple increased significantly during the month of Sawan.`,
    },
    // Repeat the above structure for all other sections as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className="flex flex-col bg-white  rounded-lg overflow-hidden"
          >
            <img
              src={section.imgSrc}
              alt={`Image ${index + 1}`}
              className="w-full h-48 object-cover mb-4"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {section.heading}
              </h3>
              <h4 className="text-md text-gray-600 mb-2">
                {section.subheading}
              </h4>
              <p className="text-sm text-gray-500">{section.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pooja;
