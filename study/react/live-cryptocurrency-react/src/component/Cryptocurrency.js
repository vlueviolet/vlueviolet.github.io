import React, { Component } from 'react';
import HeaderComponent from './HeaderComponent';
import axios from 'axios';
import moment from 'moment';
import Moment from 'react-moment';
import 'moment-timezone';
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

class Cryptocurrency extends Component {

    // 생성자
    constructor(props) {
        super(props);

        const _self = this
        const baseUrl = 'https://cryptowat.ch/markets/bithumb/'
        const baseTime = 60
        _self.state = {
            totNews: 0,
            cntNews: 5,
            newsStatus: true,
            isLoading: false,
            fullPage: true,
            dataFull: false,
            countdown: baseTime,
            ctnRefresh: 0,
            setTime: (baseTime * 1000),
            increment: 2,
            translateTxt: 'EN > KR',
            btnStatus: false,
            isActivePrice: {
                BTC: false,
                ETH: false,
                XRP: false
            },
            isActiveRatio: {
                BTC: false,
                ETH: false,
                XRP: false
            },
            cryptoPrice: {
                BTC: 0,
                ETH: 0,
                XRP: 0
            },
            cryptoRatio: {
                BTC: 0,
                ETH: 0,
                XRP: 0
            },
            news: {},
            newsLang: {
                kr: true
            },
            chartUrl: {
                BTC: baseUrl + 'btc/krw',
                ETH: baseUrl + 'eth/krw',
                XRP: baseUrl + 'xrp/krw'
            },
            currency: {},
            timestamp: {
                price: '',
                news: ''
            },
            isActive: true
        }
    }
    // 토스트 팝업
    msg = (dsc) => {
        toast.info(dsc)
    }

    // 데이터 갱신 타임스탬프
    rtnTime = (type) => {
        const _self = this.state
        const time = moment(new Date()).format('HH:mm')
        const timePrice = _self.timestamp.price
        const timeNews = _self.timestamp.news
        if (_self.timestamp.price === '' && type === 'init') {
            this.setState({
                timestamp: {
                    price: time,
                    news: time
                }
            })
        }

        if (type === 'price') {
            this.setState({
                timestamp: {
                    price: time,
                    news: timeNews
                }
            })

        } else if (type === 'news') {
            this.setState({
                timestamp: {
                    price: timePrice,
                    news: time
                }
            })
        }
    }
    // 페이지 새로고침 (for 크로스 플랫폼)
    refresh = () => {
        window.location.reload();
    }
    // 뉴스 노출 개수 카운트
    getCnt = () => {
        const _self = this.state
        this.setState({
            increment: _self.increment + 1
        })
    }

    // 암호화폐 가격, 상승율 데이터 처리
    bindCurrency = () => {
        const _self = this.state
        let getData = [];
        for (var i in _self.cryptoPrice) {
            getData.push(
                axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + i + '&tsyms=KRW&api_key=56888d8749b05cd9862d618d3d1d6af559388cd06846eb5db462d21d2137fb68')
            )
        }
        const types = ['BTC', 'ETH', 'XRP']
        // let toast = ''
        axios.all(getData)
            .then(args => {
                // 가격 데이터 처리
                let price = args.reduce(function (result, response, i) {
                    if (_self.cryptoPrice[types[i]] !== response.data.DISPLAY[types[i]].KRW.PRICE.replace(/\.\.*.*/g, '')) {
                        //이전 가격 데이터와 비교하여 갱신되었으면 변경값을 업데이트, isActivePrice 를 true 상태로 변경
                        result[types[i]] = response.data.DISPLAY[types[i]].KRW.PRICE.replace(/\.\.*.*/g, '')
                        _self.isActivePrice[types[i]] = true
                    } else {
                        //이전 가격 데이터 변경되지 않았으면 isActivePrice 를 false 상태로 변경, 기존값을 그대로 노출
                        _self.isActivePrice[types[i]] = false
                        result[types[i]] = _self.cryptoPrice[types[i]]
                    }
                    return result
                }, {})

                this.setState({
                    cryptoPrice: {
                        BTC: price.BTC,
                        ETH: price.ETH,
                        XRP: price.XRP
                    }
                })

                // 변동률 데이터 처리
                let ratio = args.reduce(function (result, response, i) {
                    result[types[i]] = response.data.DISPLAY[types[i]].KRW.CHANGEPCT24HOUR

                    if (_self.cryptoRatio[types[i]] !== response.data.DISPLAY[types[i]].KRW.CHANGEPCT24HOUR) {
                        //이전 변동률 데이터와 비교하여 갱신되었으면 변경값을 업데이트, isActivePrice 를 true 상태로 변경
                        result[types[i]] = response.data.DISPLAY[types[i]].KRW.CHANGEPCT24HOUR
                        _self.isActiveRatio[types[i]] = true
                    } else {
                        //이전 가변동률 데이터 변경되지 않았으면 isActivePrice 를 false 상태로 변경, 기존값을 그대로 노출
                        _self.isActiveRatio[types[i]] = false
                        result[types[i]] = _self.cryptoRatio[types[i]]
                    }

                    return result
                }, {})

                this.setState({
                    cryptoRatio: {
                        BTC: ratio.BTC,
                        ETH: ratio.ETH,
                        XRP: ratio.XRP
                    }
                })
            }).catch((e) => {
                console.log('Fail', e);
            });

        // 데이터 갱신 횟수 제어
        this.setState({
            ctnRefresh: _self.ctnRefresh + 1
        })

        // 데이터 갱신 타임스탬프
        this.rtnTime('init');
    }

    // 타이머
    dataTimer = () => {
        // 1초에 한 번씩 카운트다운
        const _self = this.state
        let cTime = _self.countdown

        this.timer = setTimeout(() => {
            if (_self.countdown !== 0) {
                // 카운트가 0이 되기 전까지는 -1초 적용
                this.setState({
                    countdown: cTime - 1
                })
            } else {
                // 카운트가 0이되면 인터벌 초기화 후 시간 재설정 후 recurrsion
                this.msg('Update checked')
                this.setState({
                    countdown: _self.setTime / 1000
                })

                this.bindCurrency()

                this.rtnTime('price')

                // 10분이 되면 뉴스 데이터 갱신 함수 실행
                if (_self.ctnRefresh !== 0 && _self.ctnRefresh % 5 === 0) {
                    this.bindNews('interval')
                    this.rtnTime('news')
                }
            }
        }, 1000)
    }

    // More 버튼 클릭에 따른 뉴스 데이터 개수 노출 제어
    loadNews = (response, plotData, callback) => {
        const _self = this.state
        if (_self.cntNews < response.data.Data.length) {
            this.setState({
                totNews: response.data.Data.length
            })

            for (let i = 0; i < _self.cntNews; i++) {
                plotData.push(response.data.Data[i])
            }

            this.setState({
                news: plotData
            })

            this.rtnTime('news')

            if (typeof callback == "function") {
                callback();
            }

            if (_self.cntNews > 5) {
                this.msg('Load +5 News')
            }
            this.loadingStatus(false)

            return _self.news
        } else {
            this.setState({
                dataFull: true
            })
            this.loadingStatus(false)
            this.msg('List items are fully loaded!')
        }
    }

    // 데이터 처리중 노출할 스피너 상태 제어
    loadingStatus(status) {
        this.setState({
            isLoading: status
        })
    }

    // 뉴스 데이터 처리
    bindNews(trigger) {
        const _self = this.state
        this.loadingStatus(true)
        this.setState({
            translateTxt: 'EN > KR'
        })
        this.setState({
            newsLang: {
                kr: true
            }
        })
        let plotData = []
        axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN')
            .then(response => {
                if (_self.newsStatus === false) {
                    this.setState({
                        cntNews: _self.increment * 5
                    }, async () => {
                        try {
                            await this.loadNews(response, plotData, () => {
                                this.setState({
                                    isLoading: false
                                })
                            })
                            await this.setState({ newsStatus: true })
                        } catch (e) {
                            console.log(e);
                        }
                    })
                } else if (_self.newsStatus === true) {
                    this.setState({
                        cntNews: 5
                    }, async () => {
                        try {
                            await this.loadNews(response, plotData, () => {
                                this.setState({
                                    isLoading: false
                                })
                            })
                        } catch (e) {
                            console.log(e);
                        }
                    })
                }
            })
    }

    // 번역 데이터 처리
    translateApi = (source, target, query, i, originData) => {
        const _self = this.state
        // Kakao translate
        axios
            .post('http://live.nearpin.net/response.php', {
                src_lang: source,
                target_lang: target,
                query: query
            })
            // Naver SMT translate
            /* axios
                .post('http://live.nearpin.net/response2.php', {
                source: 'en',
                target: 'ko',
                text: query
            }) */
            .then(res => {
                _self.news[i][originData] = String(res.data.translated_text[0])

                if (source === 'en') {
                    this.setState({
                        newsLang: {
                            kr: false
                        }
                    })
                    this.setState({
                        translateTxt: 'KR > EN'
                    })

                } else if (source === 'kr') {
                    this.setState({
                        newsLang: {
                            kr: true
                        }
                    })
                    this.setState({
                        translateTxt: 'EN > KR'
                    })
                }
                this.setState({
                    isLoading: false
                })

            }).catch(function (error) {
                console.log(error)
                this.setState({
                    isLoading: false
                })

                this.setState({
                    translateTxt: 'Query limit exceeded'
                })
            })
    }

    // 번역 원문 추출
    translateExec = (source, target, i, data) => {
        const _self = this.state
        this.setState({
            isLoading: true
        })
        let query = String(_self.news[i][data]).replace(/“/g, '"').replace(/”/g, '"').replace(/&/g, 'and').replace(/’/g, "'").replace(/%/g, "percent")
        this.translateApi(source, target, query, i, data)
    }

    // 번역 실행
    translate = () => {
        const _self = this.state
        for (let i = 0; i < _self.news.length; i++) {
            if (_self.newsLang.kr === true) {
                this.translateExec('en', 'kr', i, 'title')
                // this.translateExec('en', 'kr', i, 'body')
            } else {
                this.translateExec('kr', 'en', i, 'title')
                // this.translateExec('kr', 'en', i, 'body')
            }
        }
    }
    // Get Currency data (USD/KRW)
    /* getCurrency() {
        const _self = this
        axios.
            get('http://free.currencyconverterapi.com/api/v5/convert?q=USD_KRW&compact=y')
            .then(response => {
                _self.currency = response.data.USD_KRW.val.toFixed(1)
                return _self.currency
            })
    } */

    // More 버튼 클릭
    clickFunc = () => {
        this.setState({
            newsStatus: false
        }, async () => {
            try {
                await this.bindNews('click')
                await this.getCnt()
            } catch (e) {
                console.log(e);
            }
        })
    }

    // Mount 단계, Render 전에 실행
    componentWillMount = () => {
        this.bindCurrency()
        this.bindNews('interval')
    }

    // Props, State 단계, Render 이후 실행
    componentDidUpdate = () => {
        this.dataTimer()
    }

    // Props, State 단계, Render 이전 실행
    componentWillUpdate = () => {
        clearTimeout(this.timer)
    }

    render() {
        const _self = this.state
        let news = ''
        if (_self.news.length !== undefined) {
            news = _self.news.map((item) =>
                <li key={item.published_on}>
                    <a href={item.url}>
                        <div className="bx2">
                            <img src={item.imageurl} width="60" height="60" alt={item.body} />
                        </div>
                        <dl>
                            <dt><Moment unix tz="Asia/Seoul" format="YY/MM/DD HH:mm">{item.published_on}</Moment> {item.title} </dt>
                            <dd>
                                <p>{item.body}</p>
                            </dd>
                        </dl>
                    </a>
                </li>
            )
        }

        // const style = css`
        //     color: hotpink;
        // `;

        // const SomeComponent = ({ children }) => (
        //     <div css={style}>Some hotpink text. {children}</div>
        // )

        // const anotherStyle = css({
        //     textDecoration: 'underline'
        // });

        // const AnotherComponent = () => (
        //     <div css={anotherStyle}>Some Text with an underline</div>
        // )

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

        const Header = ({ children, children2 }) => (
            <header css={headerStyle}>
                <h1>Live Cryptocurrency</h1>
                {children}
                {children2}
            </header>
        )

        const HeaderCounter = () => (
            <p className="countdown">{_self.countdown}</p>
        );

        const HeaderResetButton = () => (
            <button type="button" onClick={this.refresh} className="btn_reload"><span className="blind">Refresh</span></button>
        );

        return (
            <div className="bx">
                <div css={{
                    backgroundColor: 'hotpink', '&:hover': {color: 'lightgreen'}
                }}>Emotion Test</div>
                {/* <SomeComponent>
                    <AnotherComponent />
                </SomeComponent>
                <Header>
                    <HeaderCounter />
                    <HeaderResetButton />
                </Header> */}
                <HeaderComponent />
                {/* <header>
                    <h1>Live Cryptocurrency</h1>
                    <p className="countdown">{_self.countdown}</p>
                    <button type="button" onClick={this.refresh} className="btn_reload"><span className="blind">Refresh</span></button>
                </header> */}
                <article>
                    <h2 className="h_type">Live Prices <span><span></span>{_self.timestamp.price}</span></h2>
                    <table className="type09">
                        <caption>Cryptocurrency Live</caption>
                        <thead>
                            <tr>
                                <th><a href={_self.chartUrl.BTC}>BTC/KRW</a></th>
                                <th><a href={_self.chartUrl.ETH}>ETH/KRW</a></th>
                                <th><a href={_self.chartUrl.XRP}>XRP/KRW</a></th>
                            </tr>
                        </thead >
                        <tbody>
                            <tr>
                                <td className={_self.isActivePrice.BTC === true ? 'active' : ''}><a href={_self.chartUrl.BTC}><div>{_self.cryptoPrice.BTC}</div></a></td>
                                <td className={_self.isActivePrice.ETH === true ? 'active' : ''}><a href={_self.chartUrl.ETH}><div>{_self.cryptoPrice.ETH}</div></a></td >
                                <td className={_self.isActivePrice.XRP === true ? 'active' : ''}><a href={_self.chartUrl.XRP}><div>{_self.cryptoPrice.XRP}</div></a></td >
                            </tr >
                            <tr>
                                <td className={_self.isActiveRatio.BTC === true ? 'active' : ''}><a href={_self.chartUrl.BTC}><div>{_self.cryptoRatio.BTC} %</div></a></td >
                                <td className={_self.isActiveRatio.ETH === true ? 'active' : ''}><a href={_self.chartUrl.ETH}><div>{_self.cryptoRatio.ETH} %</div></a></td >
                                <td className={_self.isActiveRatio.XRP === true ? 'active' : ''}><a href={_self.chartUrl.XRP}><div>{_self.cryptoRatio.XRP} %</div></a></td >
                            </tr >
                        </tbody >
                    </table >
                </article >
                <article>
                    <div className="h_area">
                        <h2>Recent News <span><span></span>{_self.timestamp.news}</span></h2>
                        <button type="button" onClick={this.translate} disabled={_self.btnStatus}>{_self.translateTxt}</button>
                    </div>
                    <ul>
                        {news}
                    </ul >
                    <button type="button" onClick={this.clickFunc} disabled={_self.dataFull} className="btn_type">More ({_self.cntNews}/{_self.totNews}) </button >
                </article >
                <LoadingOverlay
                    active={_self.isLoading}
                    spinner
                    text='Loading..'
                >
                </LoadingOverlay>
                <ToastContainer
                    autoClose={2000}
                />
            </div >
        )
    }
}

export default Cryptocurrency;