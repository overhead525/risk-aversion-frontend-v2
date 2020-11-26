export interface profileInterface {
  risk: number | null;
  reward: number | null;
  winPercentage: number | null;
  lossPercentage: number | null;
}

export const marketProfile = {
  risk: 0.2,
  reward: 0.4,
  winPercentage: 0.35,
  lossPercentage: 0.65,
};

export function convertRawProfile(rawProfile: profileInterface) {
  return {
    risk: rawProfile.risk ? rawProfile.risk * 100 : null,
    reward: rawProfile.reward ? rawProfile.reward * 100 : null,
    winPercentage: rawProfile.winPercentage
      ? rawProfile.winPercentage * 100
      : null,
    lossPercentage: rawProfile.lossPercentage
      ? rawProfile.lossPercentage * 100
      : null,
  } as profileInterface;
}

export function parseStringAsTitle(s: string) {
  let newString = "";
  newString = `${s.charAt(0).toUpperCase() + s.slice(1)}`;
  function rec(S: string, index: number, length: number): string {
    let result = "";
    if (index < length - 1) {
      if (S[index] == S[index].toUpperCase() && index > 0) {
        S = S.slice(0, index) + " " + S.slice(index);
        index += 2;
      } else {
        index += 1;
      }
      return rec(S, index, length);
    } else if (index === length - 1) {
      result = S;
    }
    return result;
  }

  return rec(newString, 0, newString.length);
}

export function composeRadarData(
  convertedProfile: profileInterface,
  target: string
) {
  const data: any[] = [];
  Object.entries(convertedProfile).forEach((pair, index) => {
    data.push({ attribute: parseStringAsTitle(pair[0]), trader: target });
    data[index] = { ...data[index], score: pair[1] };
  });
  return data;
}
