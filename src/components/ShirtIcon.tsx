import jerseyTopBlack from '../assets/jerseys/jersey_top_BLACK.png';
import jerseyTopBlueBlackStripes from '../assets/jerseys/jersey_top_BLUE-BLACK-STRIPES.png';
import jerseyTopBlue from '../assets/jerseys/jersey_top_BLUE.png';
import jerseyTopBluewhitestripe from '../assets/jerseys/jersey_top_BLUEWHITESTRIPE.png';
import jerseyTopGold from '../assets/jerseys/jersey_top_GOLD.png';
import jerseyTopGray from '../assets/jerseys/jersey_top_GRAY.png';
import jerseyTopGreen from '../assets/jerseys/jersey_top_GREEN.png';
import jerseyTopHotpink from '../assets/jerseys/jersey_top_HOTPINK.png';
import jerseyTopJuveaway from '../assets/jerseys/jersey_top_JUVEAWAY.png';
import jerseyTopLimeblack from '../assets/jerseys/jersey_top_LIMEBLACK.png';
import jerseyTopMaroon from '../assets/jerseys/jersey_top_MAROON.png';
import jerseyTopNavy from '../assets/jerseys/jersey_top_NAVY.png';
import jerseyTopNeonGreen from '../assets/jerseys/jersey_top_NEONGREEN.png';
import jerseyTopNotengo from '../assets/jerseys/jersey_top_NOTENGO.png';
import jerseyTopOrange from '../assets/jerseys/jersey_top_ORANGE.png';
import jerseyTopPink from '../assets/jerseys/jersey_top_PINK.png';
import jerseyTopPinkblackshoulders from '../assets/jerseys/jersey_top_PINKBLACKSHOULDERS.png';
import jerseyTopPsg4th from '../assets/jerseys/jersey_top_PSG4TH.png';
import jerseyTopPurple from '../assets/jerseys/jersey_top_PURPLE.png';
import jerseyTopRed from '../assets/jerseys/jersey_top_RED.png';
import jerseyTopRoyalBlue from '../assets/jerseys/jersey_top_ROYAL-BLUE.png';
import jerseyTopSkyblue from '../assets/jerseys/jersey_top_SKYBLUE.png';
import jerseyTopTeal from '../assets/jerseys/jersey_top_TEAL.png';
import jerseyTopUndef from '../assets/jerseys/jersey_top_UNDEF.png';
import jerseyTopWhitePsg from '../assets/jerseys/jersey_top_WHITE-PSG.png';
import jerseyTopWhite from '../assets/jerseys/jersey_top_WHITE.png';
import jerseyTopYellow from '../assets/jerseys/jersey_top_YELLOW.png';
import jerseyTopYrs from '../assets/jerseys/jersey_top_YRS.png';
import jerseyTopSpartansfc from '../assets/jerseys/jersey_top_SPARTANSFC.png';

export interface ShirtIconProps {
  shirtColor: string | null;
}

export default function ShirtIcon(props: ShirtIconProps) {
  const jerseyUrls = [
    jerseyTopBlack,
    jerseyTopBlueBlackStripes,
    jerseyTopBlue,
    jerseyTopBluewhitestripe,
    jerseyTopGold,
    jerseyTopGray,
    jerseyTopGreen,
    jerseyTopHotpink,
    jerseyTopJuveaway,
    jerseyTopLimeblack,
    jerseyTopMaroon,
    jerseyTopNavy,
    jerseyTopNeonGreen,
    jerseyTopNotengo,
    jerseyTopOrange,
    jerseyTopPink,
    jerseyTopPinkblackshoulders,
    jerseyTopPsg4th,
    jerseyTopPurple,
    jerseyTopRed,
    jerseyTopRoyalBlue,
    jerseyTopSkyblue,
    jerseyTopTeal,
    jerseyTopWhitePsg,
    jerseyTopWhite,
    jerseyTopYellow,
    jerseyTopYrs,
    jerseyTopSpartansfc
  ];

  if (!props.shirtColor) {
    return (
      <img src={jerseyTopUndef} alt="undefined colored shirt" />
    )
  }

  const shirtUpper = props.shirtColor.toUpperCase();
  const shirtNospaces = shirtUpper.replace(/ /g, '');
  let jerseyUrl = jerseyUrls.find(j => j.includes(shirtNospaces));
  if (!jerseyUrl) {
    console.log("jerseyUrl not found for " + shirtNospaces);
    jerseyUrl = jerseyTopUndef;
  }

  return (
    <img style={{height: 50}} src={jerseyUrl} alt={props.shirtColor + " colored shirt"} />
  )
}