import { React } from "react";

const Wireframe = () => {
  return (
    // <div className="w-full relative bg-white h-[1184px] overflow-hidden text-center text-mid text-themetext font-adlam-display">
    //   <header className="absolute top-[0px] left-[0px] w-[1665.6px] h-[87.9px]">
    //     <div className="absolute top-[0px] left-[0px] shadow-[0px_4.6px_4.6px_rgba(0,_0,_0,_0.25)] [background:linear-gradient(rgba(0,_0,_0,_0.2),_rgba(0,_0,_0,_0.2)),_linear-gradient(rgba(0,_0,_0,_0.2),_rgba(0,_0,_0,_0.2)),_linear-gradient(rgba(0,_0,_0,_0.2),_rgba(0,_0,_0,_0.2)),_rgba(24,_26,_31,_0.8)] w-[1665.6px] h-[87.9px]" />
    //     <img
    //       className="absolute top-[calc(50%_-_29.95px)] left-[0px] w-[220px] h-[52.3px] object-cover"
    //       alt=""
    //       src="/logo@2x.png"
    //     />
    //   </header>
    //   <section className="absolute top-[87.9px] left-[0px] [background:linear-gradient(#554d7e,_#554d7e),_#d9d9d9] w-[1665.6px] h-[1096.5px]" />
    //   <section className="absolute top-[101.8px] left-[13.9px] rounded-[17.4px] [background:linear-gradient(rgba(24,_26,_31,_0.95),_rgba(24,_26,_31,_0.95)),_#d9d9d9] w-[1237.6px] h-[86.8px]" />
    //   <section className="absolute top-[197.8px] left-[13.9px] rounded-xs-6 [background:linear-gradient(rgba(24,_26,_31,_0.95),_rgba(24,_26,_31,_0.95)),_#d9d9d9] w-[1237.6px] h-[611.9px]" />
    //   <section className="absolute top-[821.2px] left-[13.9px] rounded-xs-6 [background:linear-gradient(rgba(24,_26,_31,_0.95),_rgba(24,_26,_31,_0.95)),_#d9d9d9] w-[1237.6px] h-[347px]" />
    //   <div className="absolute top-[102px] left-[1265px] w-[387px] h-[1066px]">
    //     <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-xs-6 [background:linear-gradient(rgba(24,_26,_31,_0.95),_rgba(24,_26,_31,_0.95)),_#d9d9d9]" />
    //     <div className="absolute h-[2.06%] w-[71.32%] top-[23.79%] right-[13.95%] bottom-[74.15%] left-[14.73%] flex flex-row items-center justify-center gap-20 text-brandsecondary">
    //       <div className="relative leading-[130%]">Available Balance</div>
    //       <div className="relative leading-[130%] text-white">80000</div>
    //     </div>
    //     <div className="absolute h-[2.06%] w-[86.56%] top-[4.68%] right-[6.72%] bottom-[93.26%] left-[6.72%] flex flex-row items-center justify-center gap-[23px]">
    //       <div className="relative leading-[130%] text-brandprimary">Limit</div>
    //       <div className="w-[70px] relative leading-[130%] flex items-center justify-center h-[22px] shrink-0">
    //         Market
    //       </div>
    //       <div className="w-[99px] relative h-[22px]">
    //         <img
    //           className="absolute top-[5px] left-[82px] w-[17px] h-[13px] object-contain"
    //           alt=""
    //           src="/polygon-1.svg"
    //         />
    //         <div className="absolute top-[0px] left-[0px] leading-[130%] flex items-center justify-center w-[82px] h-[22px]">
    //           Stop Loss
    //         </div>
    //       </div>
    //       <img
    //         className="w-[22.2px] relative h-5 overflow-hidden shrink-0 object-cover"
    //         alt=""
    //         src="/info@2x.png"
    //       />
    //     </div>
    //     <div className="absolute h-[4.59%] w-[86.56%] top-[12.46%] right-[6.72%] bottom-[82.95%] left-[6.72%] rounded-31xl bg-themetextbox flex flex-row items-center justify-start py-1.5 px-3.5 box-border gap-[46px]">
    //       <div className="w-[70px] relative leading-[130%] flex items-center justify-center h-9 shrink-0">
    //         Price
    //       </div>
    //       <div className="flex flex-row items-center justify-start gap-[19px] text-white">
    //         <div className="relative leading-[130%]">88701.77</div>
    //         <div className="relative leading-[130%] text-brandsecondary">
    //           Last
    //         </div>
    //         <div className="relative leading-[130%]">USDT</div>
    //       </div>
    //     </div>
    //     <div className="absolute h-[4.68%] w-[34.88%] top-[33.96%] right-[32.56%] bottom-[61.36%] left-[32.56%] rounded-31xl bg-brandprimary overflow-hidden flex flex-row items-center justify-center py-[3.5px] px-[9.3px] box-border text-base-2 text-white">
    //       <div className="flex-1 relative leading-[130%] flex items-center justify-center h-[18px]">
    //         Buy Now
    //       </div>
    //     </div>
    //     <div className="absolute h-[4.59%] w-[86.56%] top-[18.67%] right-[6.72%] bottom-[76.74%] left-[6.72%] rounded-31xl bg-themetextbox flex flex-row items-center justify-between py-1.5 px-3.5 box-border">
    //       <div className="w-[70px] relative leading-[130%] flex items-center justify-center h-9 shrink-0">
    //         Size
    //       </div>
    //       <div className="relative leading-[130%] text-white">USDT</div>
    //     </div>
    //   </div>
    //   <div className="absolute top-[20px] left-[1480px] rounded-corner-full bg-brandprimary w-[145px] h-[39px] overflow-hidden flex flex-row items-center justify-end py-[3.5px] px-[9.3px] box-border text-base-2 text-white">
    //     <div className="flex-1 relative leading-[130%] flex items-center justify-center h-[18px]">
    //       Connect Wallet
    //     </div>
    //   </div>
    // </div>
    <div className="w-[1666px] h-[1184px] relative bg-white">
      <div className="w-[1665.60px] h-[87.91px] left-0 top-0 absolute">
        <div className="w-[1665.60px] h-[87.91px] left-0 top-0 absolute bg-black/20 shadow" />
        <img
          className="w-[220px] h-[52.32px] left-0 top-[14px] absolute"
          src="https://via.placeholder.com/220x52"
        />
      </div>
      <div className="w-[1665.60px] h-[1096.52px] left-[-0px] top-[87.91px] absolute bg-[#554d7e]" />
      <div className="w-[1237.63px] h-[611.88px] left-[13.88px] top-[197.79px] absolute bg-[#181a1f]/95 rounded-xl" />
      <div className="w-[1237.63px] h-[347px] left-[13.88px] top-[821.23px] absolute bg-[#181a1f]/95 rounded-xl" />
      <div className="w-[145px] h-[39px] px-[9.25px] py-[3.47px] left-[1480px] top-[20px] absolute bg-[#1ec7d3] rounded-full justify-end items-center gap-[11.57px] inline-flex">
        <div className="grow shrink basis-0 h-[18px] text-center text-white text-base font-normal font-['ADLaM Display'] leading-[21.05px]">
          Connect Wallet
        </div>
      </div>
      <div className="w-[145px] h-[39px] px-[9.25px] py-[3.47px] left-[1480px] top-[20px] absolute bg-[#1ec7d3] rounded-full justify-end items-center gap-[11.57px] inline-flex">
        <div className="grow shrink basis-0 h-[18px] text-center text-white text-base font-normal font-['ADLaM Display'] leading-[21.05px]">
          Connect Wallet
        </div>
      </div>
      <div className="w-[387px] h-[1066px] left-[1262px] top-[103px] absolute">
        <div className="w-[387px] h-[1066px] left-0 top-0 absolute bg-[#181a1f]/95 rounded-xl border-black" />
        <div className="h-[21.97px] left-[57px] top-[253.62px] absolute justify-center items-center gap-20 inline-flex">
          <div className="text-center text-[#d534ed] text-[17px] font-normal font-['ADLaM Display'] leading-snug">
            Available Balance
          </div>
          <div className="text-center text-white text-[17px] font-normal font-['ADLaM Display'] leading-snug">
            80000
          </div>
        </div>
        <div className="w-[335px] h-[21.97px] left-[26px] top-[49.92px] absolute justify-center items-center gap-[23px] inline-flex">
          <div className="text-center text-[#1ec7d3] text-[17px] font-normal font-['ADLaM Display'] leading-snug">
            Limit
          </div>
          <div className="w-[70px] h-[22px] text-center text-[#7a6eaa] text-[17px] font-normal font-['ADLaM Display'] leading-snug">
            Market
          </div>
          <div className="w-[99px] h-[22px] relative">
            <div className="w-[82px] h-[22px] left-0 top-0 absolute text-center text-[#7a6eaa] text-[17px] font-normal font-['ADLaM Display'] leading-snug">
              Stop Loss
            </div>
          </div>
          <div className="w-[22.22px] h-5 relative shadow-inner border-black" />
        </div>
        <div className="w-[335px] h-[48.93px] px-3.5 py-1.5 left-[26px] top-[132.80px] absolute bg-[#372f47] rounded-[50px] justify-start items-center gap-[46px] inline-flex">
          <div className="w-[70px] h-9 text-center text-[#7a6eaa] text-[17px] font-normal font-['ADLaM Display'] leading-snug">
            Price
          </div>
          <div className="justify-start items-center gap-[19px] flex">
            <div className="text-center text-white text-[17px] font-normal font-['ADLaM Display'] leading-snug">
              88701.77
            </div>
            <div className="text-center text-[#d534ed] text-[17px] font-normal font-['ADLaM Display'] leading-snug">
              Last
            </div>
            <div className="text-center text-white text-[17px] font-normal font-['ADLaM Display'] leading-snug">
              USDT
            </div>
          </div>
        </div>
        <div className="w-[135px] h-[49.92px] px-[9.25px] py-[3.47px] left-[126px] top-[362px] absolute bg-[#1ec7d3] rounded-[50px] justify-center items-center gap-[11.57px] inline-flex">
          <div className="grow shrink basis-0 h-[18px] text-center text-white text-base font-normal font-['ADLaM Display'] leading-[21.05px]">
            Buy Now
          </div>
        </div>
        <div className="w-[335px] h-[48.93px] px-3.5 py-1.5 left-[26px] top-[199px] absolute bg-[#372f47] rounded-[50px] justify-between items-center inline-flex">
          <div className="w-[70px] h-9 text-center text-[#7a6eaa] text-[17px] font-normal font-['ADLaM Display'] leading-snug">
            Size
          </div>
          <div className="text-center text-white text-[17px] font-normal font-['ADLaM Display'] leading-snug">
            USDT
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wireframe;
