import { LocalStorageLoader, LocalStorageSaver } from "../src";

function dispatch(action, data) {
  action({}, data);
}

// RAF is used as "don't do this immediately, but do it at
// the next opportunity". For sake of testing we can assume
// it works immediately.
window.requestAnimationFrame = function (x): number {
  x(0);
  return 0;
};

describe("LocalStorageLoader", () => {
  it("Should call the callback if value exists", (done) => {
    localStorage.setItem("test", '{"foo":"bar"}');
    let lsl = LocalStorageLoader("test", function (state, val) {
      done();
      return { ...state, test: val };
    });
    lsl[0](dispatch, lsl[1]);
  });
  it("Should do nothing if the value is missing", () => {
    localStorage.removeItem("test");
    LocalStorageLoader("test", function (state, val) {
      // TODO: test that this isn't called?
      return { ...state, test: val };
    });
  });
});

describe("LocalStorageSaver", () => {
  it("Should store data", () => {
    let lss = LocalStorageSaver("test", "value");
    lss[0](dispatch, lss[1]);
    expect(window.localStorage.getItem("test")).toBe('"value"');
  });
  it("Should store ints", () => {
    let lss = LocalStorageSaver("test", 1234);
    lss[0](dispatch, lss[1]);
    expect(window.localStorage.getItem("test")).toBe("1234");
  });
  it("Should store more complex stuff", () => {
    let lss = LocalStorageSaver("test", { a: [1, 2], b: true });
    lss[0](dispatch, lss[1]);
    expect(window.localStorage.getItem("test")).toBe('{"a":[1,2],"b":true}');
  });
});
