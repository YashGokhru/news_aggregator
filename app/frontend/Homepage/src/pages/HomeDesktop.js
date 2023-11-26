import { useEffect } from "react";
import "./HomeDesktop.css";

const HomeDesktop = () => {
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);
  return (
    <div className="home-desktop" data-animate-on-scroll>
      <div className="dishes">
        <div className="cardsfood-card">
          <img
            className="cardsfood-card-child"
            alt=""
            src="/ellipse-2@2x.png"
          />
          <a className="usa-today">USA Today</a>
          <img
            className="cardsfood-card-item"
            alt=""
            src="/rectangle-9636@2x.png"
          />
          <textarea className="hours-ago" placeholder="5 hours ago" />
          <a className="if-benjamin-netanyahu-led">
            If Benjamin Netanyahu-led Israel didn't create Frankenstein's
            monster, it for sure helped.
          </a>
          <a className="cardsfood-card-inner" />
          <button className="rectangle-button" />
          <button className="cardsfood-card-child1" />
          <button className="cardsfood-card-child2" />
          <div className="div">50</div>
          <div className="div1">50</div>
        </div>
      </div>
      <div className="dishes1">
        <div className="cardsfood-card">
          <img
            className="cardsfood-card-child"
            alt=""
            src="/ellipse-2@2x.png"
          />
          <a className="usa-today">USA Today</a>
          <img
            className="cardsfood-card-item"
            alt=""
            src="/rectangle-9636@2x.png"
          />
          <textarea className="hours-ago" placeholder="5 hours ago" />
          <a className="if-benjamin-netanyahu-led">
            If Benjamin Netanyahu-led Israel didn't create Frankenstein's
            monster, it for sure helped.
          </a>
          <a className="cardsfood-card-inner" />
          <button className="rectangle-button" />
          <button className="cardsfood-card-child1" />
          <button className="cardsfood-card-child2" />
          <div className="div">50</div>
          <div className="div1">50</div>
        </div>
      </div>
      <div className="dishes2">
        <div className="cardsfood-card">
          <img
            className="cardsfood-card-child"
            alt=""
            src="/ellipse-2@2x.png"
          />
          <a className="usa-today">USA Today</a>
          <img
            className="cardsfood-card-item"
            alt=""
            src="/rectangle-9636@2x.png"
          />
          <textarea className="hours-ago" placeholder="5 hours ago" />
          <a className="if-benjamin-netanyahu-led">
            If Benjamin Netanyahu-led Israel didn't create Frankenstein's
            monster, it for sure helped.
          </a>
          <a className="cardsfood-card-inner" />
          <button className="rectangle-button" />
          <button className="cardsfood-card-child1" />
          <button className="cardsfood-card-child2" />
          <div className="div">50</div>
          <div className="div1">50</div>
        </div>
      </div>
      <div className="dishes3">
        <div className="cardsfood-card">
          <img
            className="cardsfood-card-child"
            alt=""
            src="/ellipse-2@2x.png"
          />
          <b className="usa-today3">USA Today</b>
          <img
            className="cardsfood-card-item"
            alt=""
            src="/rectangle-9636@2x.png"
          />
          <div className="hours-ago3">5 hours ago</div>
          <div className="if-benjamin-netanyahu-led3">
            If Benjamin Netanyahu-led Israel didn't create Frankenstein's
            monster, it for sure helped.
          </div>
          <img
            className="cardsfood-card-child14"
            alt=""
            src="/rectangle9637@2x.png"
          />
          <img
            className="cardsfood-card-child15"
            alt=""
            src="/rectangle9638@2x.png"
          />
          <img
            className="cardsfood-card-child16"
            alt=""
            src="/rectangle9639@2x.png"
          />
          <img
            className="cardsfood-card-child17"
            alt=""
            src="/rectangle9640@2x.png"
          />
          <div className="div6">50</div>
          <div className="div7">50</div>
        </div>
      </div>
      <div className="dishes4">
        <div className="cardsfood-card4">
          <img
            className="cardsfood-card-child"
            alt=""
            src="/ellipse-2@2x.png"
          />
          <a className="usa-today">USA Today</a>
          <img
            className="cardsfood-card-item"
            alt=""
            src="/rectangle-9636@2x.png"
          />
          <textarea className="hours-ago" placeholder="5 hours ago" />
          <a className="if-benjamin-netanyahu-led">
            If Benjamin Netanyahu-led Israel didn't create Frankenstein's
            monster, it for sure helped.
          </a>
          <a className="cardsfood-card-inner" />
          <button className="rectangle-button" />
          <button className="cardsfood-card-child1" />
          <button className="cardsfood-card-child2" />
          <div className="div">50</div>
          <div className="div1">50</div>
        </div>
      </div>
      <div className="dishes5">
        <div className="cardsfood-card4">
          <img
            className="cardsfood-card-child"
            alt=""
            src="/ellipse-2@2x.png"
          />
          <b className="usa-today3">USA Today</b>
          <img
            className="cardsfood-card-item"
            alt=""
            src="/rectangle-9636@2x.png"
          />
          <div className="hours-ago3">5 hours ago</div>
          <div className="if-benjamin-netanyahu-led3">
            If Benjamin Netanyahu-led Israel didn't create Frankenstein's
            monster, it for sure helped.
          </div>
          <img
            className="cardsfood-card-child14"
            alt=""
            src="/rectangle9637@2x.png"
          />
          <img
            className="cardsfood-card-child15"
            alt=""
            src="/rectangle9638@2x.png"
          />
          <img
            className="cardsfood-card-child16"
            alt=""
            src="/rectangle9639@2x.png"
          />
          <img
            className="cardsfood-card-child17"
            alt=""
            src="/rectangle9640@2x.png"
          />
          <div className="div6">50</div>
          <div className="div7">50</div>
        </div>
      </div>
      <div className="header">
        <button className="home">Home</button>
        <a className="settings">Settings</a>
        <a className="create-post">Create Post</a>
        <a className="search">Search</a>
        <img className="header-child" alt="" src="/group-1686550876.svg" />
        <a className="noun-profile-665436-1" />
        <div className="header-item" />
      </div>
    </div>
  );
};

export default HomeDesktop;
