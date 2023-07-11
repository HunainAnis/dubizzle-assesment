import styled from "styled-components";
import Octicon from "react-octicon";

const items = [
  {
    id: 1,
    name: "Forks",
    icon: "repo-forked",
    url: "/forks",
  },
  {
    id: 3,
    name: "Comments",
    icon: "comment",
    url: "",
  },
  {
    id: 2,
    name: "Stars",
    icon: "star",
    url: "/stargazers",
  },
];

const Gist = ({ gist }) => {
  const totalFiles = Object.keys(gist?.files).length;
  return (
    <Wrapper>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Avatar src={gist?.owner?.avatar_url} />
          <a href={gist?.owner?.html_url} className="me-2 text-decoration-none">
            {gist?.owner?.login}
          </a>
        </div>
        <div className="d-flex">
          <a
            href={gist?.html_url + "/revisions"}
            className="me-3 text-decoration-none"
          >
            <Octicon name="file-code" />
            {totalFiles} File(s)
          </a>
          {items.map((item) => (
            <a
              key={item.id}
              href={gist?.html_url + item.url}
              className="me-3 text-decoration-none d-flex align-items-center"
            >
              <Octicon name={item.icon} />
              <span className="ms-1">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="d-flex mt-1">
        <div className="me-2">
          Created At: {new Date(gist?.created_at).toLocaleDateString()}
        </div>
        <div>Updated At: {new Date(gist?.updated_at).toLocaleDateString()}</div>
      </div>
      <div className="my-4">
        <div className="h6">{gist?.description || '"no description"'}</div>
      </div>
      <div className="container">
        <div className="d-flex">
          {Object.entries(gist?.files)?.map(([filename, file], i) => (
            <div key={i} className="me-2">
              <div
                onClick={() => window.open(file.raw_url)}
                style={{ cursor: "pointer" }}
                className="border border-dashed border-1 border-primary p-1 text-primary rounded d-flex align-items-center"
              >
                <Octicon name="file" />
                <div>{filename}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding: 8px;
  background-color: #ffffff;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 6px;
  margin: 0 16px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 16px;
`;

export default Gist;
