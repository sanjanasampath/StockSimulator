import { Tab, TabGroup, TabList } from "@headlessui/react";

function Tabs({ value, onChange, options, children }) {
  return (
    <TabGroup value={value} onChange={onChange}>
      <TabList className="flex gap-4">
        {options.map((option) => (
          <Tab
            key={option}
            className="py-1 px-3 text-sm/6 font-semibold
							text-brand focus:outline-none data-[selected]:text-primary data-[selected]:data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-none"
          >
            {option}
          </Tab>
        ))}
      </TabList>
      <hr className="h-px my-1 bg-brandText/40 border-0" />
      {children}
    </TabGroup>
  );
}

export default Tabs;
