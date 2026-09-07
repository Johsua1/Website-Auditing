const normalizeLogoKey = (value = "") =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const logoMap = {
  [normalizeLogoKey("Brains Infinite Innovations")]: new URL(
    "../assets/Brains.png",
    import.meta.url,
  ).href,
  [normalizeLogoKey("Brains")]: new URL("../assets/Brains.png", import.meta.url)
    .href,

  [normalizeLogoKey("Connector")]: new URL(
    "../assets/connector.png",
    import.meta.url,
  ).href,

  [normalizeLogoKey("The Green Oasis")]: new URL(
    "../assets/GreenOasis.png",
    import.meta.url,
  ).href,
  [normalizeLogoKey("Green Oasis")]: new URL(
    "../assets/GreenOasis.png",
    import.meta.url,
  ).href,
  [normalizeLogoKey("GreenOasis")]: new URL(
    "../assets/GreenOasis.png",
    import.meta.url,
  ).href,

  [normalizeLogoKey("HYT Foundation Inc.")]: new URL(
    "../assets/HYT.png",
    import.meta.url,
  ).href,
  [normalizeLogoKey("HYT")]: new URL("../assets/HYT.png", import.meta.url).href,
  [normalizeLogoKey("HYT COMPANY")]: new URL(
    "../assets/HYT.png",
    import.meta.url,
  ).href,

  [normalizeLogoKey("Klassic Marketing Inc.")]: new URL(
    "../assets/KMI.jpg",
    import.meta.url,
  ).href,
  [normalizeLogoKey("KMI")]: new URL("../assets/KMI.jpg", import.meta.url).href,
  [normalizeLogoKey("KLASSIC MARKETING")]: new URL(
    "../assets/KMI.jpg",
    import.meta.url,
  ).href,

  [normalizeLogoKey("Klassic Solutions Inc.")]: new URL(
    "../assets/KSC Logo.png",
    import.meta.url,
  ).href,
  [normalizeLogoKey("KSC LOGO")]: new URL(
    "../assets/KSC Logo.png",
    import.meta.url,
  ).href,
  [normalizeLogoKey("KSC")]: new URL("../assets/KSC.png", import.meta.url).href,
  [normalizeLogoKey("KLASSIC SOLUTION")]: new URL(
    "../assets/KSC Logo.png",
    import.meta.url,
  ).href,

  [normalizeLogoKey("KLASSIC GROUP OF COMPANIES")]: new URL(
    "../assets/KSC.png",
    import.meta.url,
  ).href,
  [normalizeLogoKey("Klassic Group of Companies")]: new URL(
    "../assets/KSC.png",
    import.meta.url,
  ).href,
  [normalizeLogoKey("KSC GROUP")]: new URL("../assets/KSC.png", import.meta.url)
    .href,

  [normalizeLogoKey("The Luxurious Cleaning Co.")]: new URL(
    "../assets/LCC.jpg",
    import.meta.url,
  ).href,
  [normalizeLogoKey("Luxurious Cleaning Co")]: new URL(
    "../assets/LCC.jpg",
    import.meta.url,
  ).href,
  [normalizeLogoKey("LCC")]: new URL("../assets/LCC.jpg", import.meta.url).href,

  [normalizeLogoKey("The Finest Fit")]: new URL(
    "../assets/TFF.jpg",
    import.meta.url,
  ).href,
  [normalizeLogoKey("TFF")]: new URL("../assets/TFF.jpg", import.meta.url).href,

  [normalizeLogoKey("Westwood Development Corporation")]: new URL(
    "../assets/WDC.png",
    import.meta.url,
  ).href,
  [normalizeLogoKey("WDC")]: new URL("../assets/WDC.png", import.meta.url).href,
  [normalizeLogoKey("WESTWOOD DEVELOPMENT")]: new URL(
    "../assets/WDC.png",
    import.meta.url,
  ).href,

  [normalizeLogoKey("Westwood Law Firm")]: new URL(
    "../assets/WLI.png",
    import.meta.url,
  ).href,
  [normalizeLogoKey("WLI")]: new URL("../assets/WLI.png", import.meta.url).href,
  [normalizeLogoKey("WESTWOOD LAWFIRM")]: new URL(
    "../assets/WLI.png",
    import.meta.url,
  ).href,
};

const logoPatterns = [
  {
    test: /brains|infinite innovations/,
    src: new URL("../assets/Brains.png", import.meta.url).href,
  },
  {
    test: /connector/,
    src: new URL("../assets/connector.png", import.meta.url).href,
  },
  {
    test: /green oasis|greenoasis/,
    src: new URL("../assets/GreenOasis.png", import.meta.url).href,
  },
  {
    test: /hyt|foundation/,
    src: new URL("../assets/HYT.png", import.meta.url).href,
  },
  {
    test: /klassic marketing|kmi|marketing/,
    src: new URL("../assets/KMI.jpg", import.meta.url).href,
  },
  {
    test: /klassic solution|klassic solutions|ksc logo|solution/,
    src: new URL("../assets/KSC Logo.png", import.meta.url).href,
  },
  {
    test: /klassic group|group of companies|ksc group/,
    src: new URL("../assets/KSC.png", import.meta.url).href,
  },
  {
    test: /luxurious cleaning|lcc/,
    src: new URL("../assets/LCC.jpg", import.meta.url).href,
  },
  {
    test: /finest fit|tff/,
    src: new URL("../assets/TFF.jpg", import.meta.url).href,
  },
  {
    test: /westwood development|wdc/,
    src: new URL("../assets/WDC.png", import.meta.url).href,
  },
  {
    test: /westwood law|wli|law firm/,
    src: new URL("../assets/WLI.png", import.meta.url).href,
  },
];

const getLogoSource = (name) => {
  const normalized = normalizeLogoKey(name);

  if (logoMap[normalized]) {
    return logoMap[normalized];
  }

  const matchingLogo = logoPatterns.find(({ test }) => test.test(normalized));
  if (matchingLogo) {
    return matchingLogo.src;
  }

  return new URL("../assets/hero.png", import.meta.url).href;
};

const CompanyLogo = ({
  website,
  className = "h-12 w-12 rounded-lg border border-gray-200 bg-white p-1 shadow-sm",
}) => {
  if (!website) {
    return null;
  }

  return (
    <div className={`overflow-hidden rounded-lg ${className}`}>
      <img
        src={getLogoSource(website.name)}
        alt={`${website.name} logo`}
        className="block h-full w-full object-contain"
        draggable={false}
      />
    </div>
  );
};

export default CompanyLogo;
