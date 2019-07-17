import React, { Component } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);

        const _self = this
        const baseTime = 10

        _self.state = {
            countdown: baseTime
        }
    }

    // Props, State 단계, Render 이후 실행
    componentDidUpdate = () => {
        this.dataTimer()
    }

    // Props, State 단계, Render 이전 실행
    componentWillUpdate = () => {
        clearTimeout(this.timer)
    }

    dataTimer = () => {
        // 1초에 한 번씩 카운트다운
        const _self = this.state
        let cTime = _self.countdown
    
        this.timer = setTimeout(() => {
            console.log(_self.countdown);
            if (_self.countdown !== 0) {
                // 카운트가 0이 되기 전까지는 -1초 적용
                this.setState({
                    countdown: cTime - 1
                })
            } else {
                // 카운트가 0이되면 인터벌 초기화 후 시간 재설정 후 recurrsion
                // this.msg('Update checked')
                // this.setState({
                //     countdown: _self.setTime / 1000
                // })
    
                // this.bindCurrency()
    
                // this.rtnTime('price')
    
                // // 10분이 되면 뉴스 데이터 갱신 함수 실행
                // if (_self.ctnRefresh !== 0 && _self.ctnRefresh % 5 === 0) {
                //     this.bindNews('interval')
                //     this.rtnTime('news')
                // }
            }
        }, 1000)
    }
    
    refresh = () => {
        window.location.reload();
    }

    

    // 토스트 팝업
    // msg = (dsc) => {
    //     toast.info(dsc)
    // }
    
    render() {
        const _self = this;
        const Header = ({ children, children2 }) => (
            <header css={headerStyle}>
                <h1>Live Cryptocurrency</h1>
                {children}
                {children2}
            </header>
        )

        const headerStyle = css({
            zIndex: 10,
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            height: '64px',
            borderBottom: '2px solid #2a3b52',
            background: '#2e4564'
        })

        const HeaderCounter = () => (
            <p className="countdown">{_self.countdown}</p>
        );

        const HeaderResetButton = () => (
            <button type="button" onClick={this.refresh} className="btn_reload"><span className="blind">Refresh</span></button>
        );

        return(
            <Header>
                <HeaderCounter />
                <HeaderResetButton />
            </Header>
        )
    }
}

export default HeaderComponent;