import React, {useEffect, useState} from "react";
import "./allStyles.css"
import Nav from "./nav/Nav";
import AfterNav from "./calc/AfterNav";
import {useDispatch} from "react-redux";
// import GTPErrorResponse from "./admin/GTPErrorResponse";
import {Route, Routes} from "react-router-dom";
import Footer from "./footer/Footer";

function AllWindow() {
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(fetchPrices())
    }, [])
    const [err, setErr] = useState(null);
    return (
        <div>
            <Routes>
                {/*<Route path="/CashFull" element={<CrmCash3Full/>} />*/}
                {/*<Route path="/CashFull/:id" element={<CrmCash3Full/>} />*/}

                {/*<Route path="/CashFull" element={<ClientPip/>} />*/}
                {/*<Route path="/CashFull/:id" element={<NewUIArtem/>} />*/}

                {/*<Route path="/CashFull" element={<WebComponent/>} />*/}
                {/*<Route path="/CashFull" element={<CrmCash3Full/>} />*/}
                {/*<Route path="/CashFull/:id" element={<CPM/>} />*/}

                {/*<Route path="/CashFull" element={<Kassa setErr={setErr}/>} />*/}
                {/*<Route path="/CashFull/:id" element={<Kassa setErr={setErr}/>} />*/}

                <Route path="*" element={(
                    <>
                      <Nav setErr={setErr}/>
                      <AfterNav setErr={setErr}/>
                      <Footer setErr={setErr}/>
                    </>
                )} />
            </Routes>
            {err ? (
                    <div></div>
                // <GTPErrorResponse err={err} setErr={setErr}/>
            ) : (
                <div></div>
            )}
            {/*<PhotoLayoutEditor />*/}
        </div>
    );
}

export default AllWindow;