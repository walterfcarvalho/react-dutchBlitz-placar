import "./footer.css"

const Footer = () => {

  return <>
    <div className="indexFooter">
      <div>
        <a
          className="link-dark"
          href="https://www.wikihow.com/Play-Dutch-Blitz"
          rel="noopener noreferrer"
          target="_blank"
        >
          How to play?
        </a>
      </div>

      <div className="imagem">
        <img className="github"
          src={require(`./../../images/GitHub-Mark-32px.png`)}
          alt="Logo GitHub"
        />
        <a
          className="link-dark"
          href="https://github.com/walterfcarvalho/react-dutchBlitza-placar"
          rel="noopener noreferrer"
          target="_blank"
        >
          Github
        </a>
      </div>
    </div>

  </>

}

export default Footer