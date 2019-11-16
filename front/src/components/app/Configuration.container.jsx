import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import QuestionsGrid from '../question/QuestionsGrid';
import Skill from '../skill/Skill';

const ConfigurationContainer = props => {

  return (
    <Tabs>
      <TabList>
        <Tab>Question</Tab>
        <Tab>Skills</Tab>
      </TabList>

      <TabPanel>
        <QuestionsGrid />
      </TabPanel>
      <TabPanel>
        <Skill />
      </TabPanel>
    </Tabs>

  )
}

export default ConfigurationContainer;