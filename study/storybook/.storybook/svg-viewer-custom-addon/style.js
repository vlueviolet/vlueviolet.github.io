import {styled} from '@storybook/theming';
export const initialStyle = `
  margin: 0;
  padding: 0;
`;

export const buttonInitial = `
  overflow: visible;
  border: none;
  border-radius: 0;
  background: none;
  cursor: pointer;
  -webkit-user-select: none;
`;

export const inputInitial = `
  -webkit-border-radius: 0;
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  background: transparent;
  &::-ms-reveal {
    display: none;
  }
  &::-ms-clear,
  &::-ms-reveal{
    display:none;width:0;height:0;
  }
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration{
    display:none;
  }
`;

export const Wrapper = styled.section`
  min-width: 500px;
`;

export const SearchBox = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 10px;
  background-color: #fff;
  .svg-viewer-search-inner {
    display: inline-flex;
    align-items: center;
    position: relative;
    padding-left: 5px;
    border: 1px solid #eee;
    border-radius: 3px;
  }
  label {
    display: inline-block;
    vertical-align: top;
  }
  input {
    ${inputInitial}
    height: 30px;
    padding: 0 25px 0 5px;
    font-size: 13px;
    line-height: 30px;
    outline: none;
  }
  button {
    ${buttonInitial}
  }
  .svg-viewer-srch-delete {
    position: absolute;
    top: 50%;
    right: 5px;
    width: 20px;
    height: 20px;
    padding: 0;
    border-radius: 50%;
    transform: translateY(-50%);
    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      height: 12px;
      margin-top: -6px;
      border-left: 1px solid #2a2a2a;
      content: '';
    }
    &:before {
      transform: rotate(-45deg);
    }
    &:after {
      transform: rotate(45deg);
    }
  }
  .btn-search {
    ${buttonInitial}
    min-width: 60px;
    height: 30px;
    margin-left: 5px;
    border-radius: 3px;
    background-color: #2a2a2a;
    padding: 0 10px;
    font-size: 13px;
    font-weight: bold;
    color: #fff;
    vertical-align: top;
    box-sizing: border-box;
    transition: background-color 0.1s ease-out;
    &:disabled {
      background-color: #ddd;
      cursor: default;
      pointer-events: none;
    }
  }
`;

export const List = styled.ul`
  ${initialStyle}
  list-style: none;
`;

export const ListItem = styled.li`
  display: inline-block;
  width: 25%;

  .svg-viewer-item-inner {
    overflow: hidden;
    margin: 10px;
    border: 1px solid #eee;
    border-radius: 5px;
  }
`;

export const ListName = styled.div`
  padding: 10px;
  color: #2a2a2a;
  text-align: center;

  &:hover {
    .svg-viewer-item-copy {
      visibility: visible;
    }
  }

  .svg-viewer-item-name {
    display: inline-block;
    overflow: hidden;
    position: relative;
    max-width: 100%;
    em {
      display: block;
      overflow: hidden;
      position: relative;
      padding: 0 5px;
      font-style: normal;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      &:hover {
        &:after {
          width: 100%;
        }
      }
      &:active {
        background: tomato;
        color: #fff;
      }
      &:after {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 1px;
        background-color: tomato;
        transition: all 0.3s ease-out;
        content: '';
      }
    }
  }

  .svg-viewer-item-path {
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    font-size: 12px;
    color: rgba(51, 51, 51, 0.3);
    text-align: center;
    box-sizing: border-box;

    &-inner {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      span {
        display: inline-block;
        overflow: hidden;
        position: relative;
        max-width: 100%;
        padding: 0 5px;
        font-style: normal;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        &:hover {
          &:after {
            width: 100%;
          }
        }
        &:active {
          background-color: blueviolet;
          color: #fff;
        }
        &:after {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background-color: blueviolet;
          transition: all 0.3s ease-out;
          content: '';
        }
      }
    }
  }

  .svg-viewer-item-copy {
    ${buttonInitial}
    visibility: hidden;
    display: block;
    overflow: visible;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #2a2a2a;
    font-size: 13px;
    color: #fff;
    em {
      margin-left: 3px;
      font-style: normal;
      color: orange;
    }
  }
`;

export const ListViewer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100px;
  padding: 10px;
  background-color: #eee;
  text-align: center;
  box-sizing: border-box;

  &:hover {
    .svg-viewer-text {
      visibility: visible;
    }
  }

  &.dark {
    background-color: #2a2a2a;
  }

  .svg-viewer-text {
    visibility: hidden;
    position: absolute;
    right: 5px;
    bottom: 5px;
    font-size: 11px;
    color: gray;
  }
`;

export const ListFile = styled.div`
  display: inline-block;
  max-width: 50px;
  max-height: 50px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const ListSource = styled.div`
  overflow: auto;
  height: 100px;
  font-size: 12px;
  font-weight: 300;
  color: rgba(51, 51, 51, 0.5);

  .svg-viewer-source-inner {
    display: block;
    overflow: hidden;
    margin: 10px;
    box-sizing: border-box;
  }
`;

export const NoResult = styled.div`
  padding: 50px 30px;
  font-size: 15px;
  color: #2a2a2a;
  line-height: 30px;
  text-align: center;
  word-break: break-all;
  em {
    font-style: normal;
    font-weight: bold;
    color: tomato;
  }
`;
