import Container50 from "../components/Container50";
import Header from "../components/Header";
import "./HomeDesktop.css";

const HomeDesktop = () => {
  return (
    <div className="home-desktop">
      <div className="background" />
      <div className="dishes">
        <Container50 />
        <div className="cardsfood-card" />
      </div>
      <img className="home-desktop-child" alt="" src="/ellipse-2@2x.png" />
      <div className="hours-ago">5 hours ago</div>
      <div className="sports-india-news">{`#sports    #india    #news    #live    #trending  `}</div>
      <div className="if-benjamin-netanyahu-led">
        If Benjamin Netanyahu-led Israel didn't create Frankenstein's monster,
        it for sure helped nourish it.
      </div>
      <div className="businessman-bernie-moreno">
        Businessman Bernie Moreno and other Republican politicians in Ohio have
        tried to turn public support away from the Issue 1 ballot measure facing
        voters Tuesday. Ohio Republican Senate candidate Bernie Moreno falsely
        claimed in a recent interview in a recent interview that Issue 1 . . .
      </div>
      <Header />
      <div className="rectangle-parent">
        <button className="frame-child" />
        <button className="frame-item" />
        <div className="comments">
          <p className="comments1">Comments</p>
        </div>
        <button className="frame-inner" />
        <div className="rectangle-group">
          <button className="group-child" />
          <button className="group-item" />
          <div className="user-1">user 1</div>
          <div className="comment-1">comment 1</div>
          <button className="group-inner" />
          <div className="user-2">user 2</div>
          <div className="comment-2">
            <p className="comments1">comment 2</p>
          </div>
        </div>
        <div className="add-comment">Add comment +</div>
      </div>
    </div>
  );
};

export default HomeDesktop;
