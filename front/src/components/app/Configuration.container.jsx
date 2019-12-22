import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import QuestionsGrid from '../question/QuestionsGrid';
import Skill from '../skill/Skill';
import TemplatesGrid from '../template/TemplatesGrid';

const ConfigurationContainer = props => {

  return (
    <Tabs>
      <TabList>
        <Tab>Question</Tab>
        <Tab>Skills</Tab>
        <Tab>Interview Templates</Tab>
      </TabList>

      <TabPanel> 
        <QuestionsGrid />
      </TabPanel>
      <TabPanel>
        <Skill />
      </TabPanel>
      <TabPanel>
        <TemplatesGrid history={props.history} />
      </TabPanel>
    </Tabs>

  )
}

export default ConfigurationContainer;