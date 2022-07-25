import React from 'react';
import Wrapper from '@erxes/ui/src/layout/components/Wrapper';
import { Flex } from '@erxes/ui/src/styles/main';
import Button from '@erxes/ui/src/components/Button';
import EmptyState from '@erxes/ui/src/components/EmptyState';
import Table from '@erxes/ui/src/components/table';
import { __ } from '@erxes/ui/src/utils';
import { Link } from 'react-router-dom';
import { IPage } from '../../types';
import Row from './Row';

type Props = {
  pages: IPage[];
  getActionBar: (actionBar: any) => void;
  remove: (_id: string) => void;
};

class Pages extends React.Component<Props, {}> {
  renderRow = (pages: IPage[]) => {
    const { remove } = this.props;

    return pages.map(page => (
      <Row history={history} key={page._id} page={page} remove={remove} />
    ));
  };

  render() {
    const { pages, getActionBar } = this.props;

    const actionBarRight = (
      <Flex>
        <Link to="pages/create">
          <Button btnStyle="success" size="small" icon="plus-circle">
            Add page
          </Button>
        </Link>
      </Flex>
    );

    const ActionBar = <Wrapper.ActionBar right={actionBarRight} />;

    getActionBar(ActionBar);

    let content = (
      <>
        <Table hover={true}>
          <thead>
            <tr>
              <th>{__('Name')}</th>
              <th>{__('Description')}</th>
              <th>{__('Actions')}</th>
            </tr>
          </thead>
          <tbody>{this.renderRow(pages)}</tbody>
        </Table>
      </>
    );

    if (pages.length === 0) {
      content = (
        <EmptyState
          image="/images/actions/8.svg"
          text="No Entries"
          size="small"
        />
      );
    }

    return <>{content}</>;
  }
}

export default Pages;