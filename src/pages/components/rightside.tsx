/*
  全站右边栏
*/
import { Chrome, ChevronsRight, Github, Facebook,Twitter } from "@zeit-ui/react-icons";
import { Button } from "@zeit-ui/react";

function RightSide() {
  return (
    <div className="inside">

      <h3>Share</h3>
      <div className="card">
        <div className="icon">
          <Chrome /> <p>Copy URL</p>
        </div>
        <div>
          <Button auto type="success">
            <ChevronsRight />
          </Button>
        </div>
      </div>
      <div className="card">
        <div className="icon">
          <Facebook /> <p>Facebook</p>
        </div>
        <div>
          <Button auto type="success">
            <ChevronsRight />
          </Button>
        </div>
      </div>
      <div className="card">
        <div className="icon">
          <Twitter /> <p>Twitter</p>
        </div>
        <div>
          <Button auto type="success">
            <ChevronsRight />
          </Button>
        </div>
      </div>

      <h3>Source</h3>
      <div className="card">
        <div className="icon">
          <Github /> <p>Repository</p>
        </div>
        <div>
          <Button auto type="success">
            <ChevronsRight />
          </Button>
        </div>
      </div>

    </div>
  );
}

export default RightSide;
