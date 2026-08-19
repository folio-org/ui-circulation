import PropTypes from 'prop-types';

import { useSortable } from '@dnd-kit/react/sortable';

import NoticeCard from '../NoticeCard';

const SortableNoticeCard = ({
  id,
  noticeIndex,
  ...rest
}) => {
  const { ref, handleRef } = useSortable({
    id,
    index: noticeIndex,
  });

  return (
    <NoticeCard
      {...rest}
      noticeIndex={noticeIndex}
      dragRef={ref}
      dragHandleRef={handleRef}
    />
  );
};

SortableNoticeCard.propTypes = {
  id: PropTypes.number.isRequired,
  noticeIndex: PropTypes.number.isRequired,
};

export default SortableNoticeCard;
