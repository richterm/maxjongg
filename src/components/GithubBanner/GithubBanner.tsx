import GithubCorner from "react-github-corner";

export const GithubBanner: React.FC = () => {
  return (
    <GithubCorner
      svgStyle={{ zIndex: 1 }}
      href="https://github.com/richterm/maxjongg"
      bannerColor="#2b223a"
      octoColor="#03edf9"
    />
  );
};
