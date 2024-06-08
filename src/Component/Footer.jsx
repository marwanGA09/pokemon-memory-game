import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';

export function Footer() {
  return (
    <div className="footer">
      <p>By Adem KG</p>
      <div className="links">
        <a href="mailto:ademkedir724@gmail.com">
          <FontAwesomeIcon icon={faMailBulk} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faXTwitter} />
        </a>
      </div>
    </div>
  );
}
