import { expect } from 'chai';
import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';

import translation from '../../../../translations/ui-circulation/en';
import setupApplication from '../../helpers/setup-application';
import NoticePolicyDetail from '../../interactors/notice-policy/notice-policy-detail';
import { getBooleanRepresentation } from '../../helpers/messageСonverters';

describe('NoticePolicyDetail', () => {
  setupApplication();

  describe('viewing notice policy', () => {
    describe('\n\taccordions\n', () => {
      let noticePolicy;

      beforeEach(function () {
        noticePolicy = this.server.create('patronNoticePolicy');

        this.visit(`/settings/circulation/notice-policies/${noticePolicy.id}`);
      });

      it('should be displayed', () => {
        expect(NoticePolicyDetail.expandAll.isPresent).to.be.true;
      });

      describe('\n\tcollapse all\n', () => {
        beforeEach(async () => {
          await NoticePolicyDetail.expandAll.click();
        });

        it('generalSection should not be displayed', () => {
          expect(NoticePolicyDetail.generalSection.content.isHidden).to.be.true;
        });

        it('loanNoticesSection should not be displayed', () => {
          expect(NoticePolicyDetail.loanNoticesSection.content.isHidden).to.be.true;
        });

        it('requestNoticesSection should not be displayed', () => {
          expect(NoticePolicyDetail.requestNoticesSection.content.isHidden).to.be.true;
        });

        describe('\n\texpand all\n', () => {
          beforeEach(async () => {
            await NoticePolicyDetail.expandAll.click();
          });

          it('generalSection should be displayed', () => {
            expect(NoticePolicyDetail.generalSection.content.isVisible).to.be.true;
          });

          it('loanNoticesSection should be displayed', () => {
            expect(NoticePolicyDetail.loanNoticesSection.content.isVisible).to.be.true;
          });

          it('requestNoticesSection should be displayed', () => {
            expect(NoticePolicyDetail.requestNoticesSection.content.isVisible).to.be.true;
          });
        });
      });
    });

    describe('general section', () => {
      describe('random notice policy', () => {
        let patronNoticeTemplate;
        let noticePolicy;

        beforeEach(function () {
          patronNoticeTemplate = this.server.create('templates', { category: 'Loan' });
          noticePolicy = this.server.create('patronNoticePolicy', {
            active: true,
            loanNotices: [{
              name: 'mockName',
              templateId: patronNoticeTemplate.id,
              templateName: 'mockTemplateName',
              format: 'Email',
              frequency: 'Recurring',
              realTime: true,
              sendOptions: {
                sendHow: 'After',
                sendWhen: 'Due date',
                sendBy: {
                  duration: 2,
                  intervalId: 'Hours'
                },
                sendEvery: {
                  duration: 2,
                  intervalId: 'Hours'
                }
              }
            }],
          });
          this.visit(`/settings/circulation/notice-policies/${noticePolicy.id}`);
        });

        describe('name', () => {
          it('should be displayed', () => {
            expect(NoticePolicyDetail.generalSection.name.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(NoticePolicyDetail.generalSection.name.label.text).to.equal(translation['settings.noticePolicy.policyName']);
          });

          it('should have a proper value', () => {
            expect(NoticePolicyDetail.generalSection.name.value.text).to.equal(noticePolicy.name);
          });
        });

        describe('description', () => {
          it('should be displayed', () => {
            expect(NoticePolicyDetail.generalSection.description.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(NoticePolicyDetail.generalSection.description.label.text).to.equal(translation['settings.noticePolicy.policyDescription']);
          });

          it('should have a proper value', () => {
            expect(NoticePolicyDetail.generalSection.description.value.text).to.equal(noticePolicy.description);
          });
        });

        describe('active', () => {
          it('should be displayed', () => {
            expect(NoticePolicyDetail.generalSection.active.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(NoticePolicyDetail.generalSection.active.label.text).to.equal(translation['settings.noticePolicy.active']);
          });

          it('should have a proper value', () => {
            expect(NoticePolicyDetail.generalSection.active.value.text).to.equal(translation['settings.common.yes']);
          });
        });
      });
    });

    describe('loan notices section', () => {
      describe('loan notice cards', () => {
        let patronNoticeTemplate;
        let noticePolicy;

        beforeEach(function () {
          patronNoticeTemplate = this.server.create('templates', { category: 'Loan' });
          noticePolicy = this.server.create('patronNoticePolicy', {
            active: true,
            loanNotices: [{
              name: 'mockName',
              templateId: patronNoticeTemplate.id,
              templateName: 'mockTemplateName',
              format: 'Email',
              frequency: 'Recurring',
              realTime: true,
              sendOptions: {
                sendHow: 'After',
                sendWhen: 'Due date',
                sendBy: {
                  duration: 2,
                  intervalId: 'Hours'
                },
                sendEvery: {
                  duration: 2,
                  intervalId: 'Hours'
                }
              }
            },
            {
              name: 'mockName1',
              templateId: patronNoticeTemplate.id,
              templateName: 'mockTemplateName1',
              format: 'Email',
              frequency: 'Recurring',
              realTime: true,
              sendOptions: {
                sendHow: 'Before',
                sendWhen: 'Due date',
                sendBy: {
                  duration: 2,
                  intervalId: 'Hours'
                },
                sendEvery: {
                  duration: 2,
                  intervalId: 'Hours'
                }
              }
            }],
          });

          this.visit(`/settings/circulation/notice-policies/${noticePolicy.id}`);
        });

        it('should have cards', () => {
          expect(NoticePolicyDetail.loanNoticesSection.hasCards).to.be.true;
        });

        it('has two card', () => {
          expect(NoticePolicyDetail.loanNoticesSection.cardsCount).to.equal(2);
        });
      });
    });

    describe('request notices section', () => {
      describe('loan notice cards', () => {
        let noticePolicy;

        beforeEach(function () {
          noticePolicy = this.server.create('patronNoticePolicy', {
            active: true,
            requestNotices: [{
              name: 'mockName',
              templateName: 'mockTemplateName',
              format: 'Email',
              frequency: 'Recurring',
              realTime: true,
              sendOptions: {
                sendHow: 'After',
                sendWhen: 'Due date',
                sendBy: {
                  duration: 2,
                  intervalId: 'Hours'
                },
                sendEvery: {
                  duration: 2,
                  intervalId: 'Hours'
                }
              }
            },
            {
              name: 'mockName1',
              templateName: 'mockTemplateName1',
              format: 'Email',
              frequency: 'Recurring',
              realTime: true,
              sendOptions: {
                sendHow: 'Before',
                sendWhen: 'Due date',
                sendBy: {
                  duration: 2,
                  intervalId: 'Hours'
                },
                sendEvery: {
                  duration: 2,
                  intervalId: 'Hours'
                }
              }
            }],
          });

          this.visit(`/settings/circulation/notice-policies/${noticePolicy.id}`);
        });

        it('should have cards', () => {
          expect(NoticePolicyDetail.requestNoticesSection.hasCards).to.be.true;
        });

        it('has two card', () => {
          expect(NoticePolicyDetail.requestNoticesSection.cardsCount).to.equal(2);
        });
      });
    });


    describe('notice card', () => {
      describe('random notice policy', () => {
        let patronNoticeTemplate;
        let noticePolicy;

        beforeEach(function () {
          patronNoticeTemplate = this.server.create('templates', { category: 'Loan' });
          noticePolicy = this.server.create('patronNoticePolicy', {
            active: true,
            loanNotices: [{
              name: 'mockName',
              templateId: patronNoticeTemplate.id,
              templateName: 'mockTemplateName',
              format: 'Email',
              frequency: 'Recurring',
              realTime: true,
              sendOptions: {
                sendHow: 'After',
                sendWhen: 'Due date',
                sendBy: {
                  duration: 2,
                  intervalId: 'Hours'
                },
                sendEvery: {
                  duration: 2,
                  intervalId: 'Hours'
                }
              }
            }],
          });

          this.visit(`/settings/circulation/notice-policies/${noticePolicy.id}`);
        });

        it('should have card', () => {
          expect(NoticePolicyDetail.loanNoticesSection.hasCards).to.be.true;
        });

        it('has one card', () => {
          expect(NoticePolicyDetail.loanNoticesSection.cardsCount).to.equal(1);
        });

        describe('triggering event', () => {
          it('should be displayed', () => {
            expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).triggeringEvent.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).triggeringEvent.label.text).to.equal(
              translation['settings.noticePolicy.notices.triggeringEvent']
            );
          });

          it('should have a proper value', () => {
            expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).triggeringEvent.value.text).to.equal(
              translation['settings.noticePolicy.loanNotices.dueDate']
            );
          });
        });

        describe('templateId', () => {
          it('should be displayed', () => {
            expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).templateId.isPresent).to.be.true;
          });

          it('should have a proper value', () => {
            expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).templateId.value.text).to.equal(
              patronNoticeTemplate.name
            );
          });

          it('should have a proper label', () => {
            expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).templateId.label.text).to.equal(
              translation['settings.noticePolicy.notices.template']
            );
          });
        });

        describe('via text', () => {
          it('should be displayed', () => {
            expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).viaText.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).viaText.text).to.equal(
              translation['settings.noticePolicy.notices.via']
            );
          });
        });

        describe('format', () => {
          it('should be displayed', () => {
            expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).format.isPresent).to.be.true;
          });

          it('should have a proper value', () => {
            expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).format.value.text).to.equal(
              noticePolicy.loanNotices[0].format
            );
          });

          it('should have a proper label', () => {
            expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).format.label.text).to.equal(
              translation['settings.noticePolicy.notices.format']
            );
          });
        });

        describe('frequency', () => {
          it('should be displayed', () => {
            expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).frequency.isPresent).to.be.true;
          });

          it('should have a proper value', () => {
            expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).frequency.text).to.equal(
              noticePolicy.loanNotices[0].frequency
            );
          });

          it('should have a proper label', () => {
            expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).frequencyLabel.text).to.equal(
              translation['settings.noticePolicy.notices.frequency']
            );
          });
        });

        describe('real Time', () => {
          it('should be displayed', () => {
            expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).realTime.isPresent).to.be.true;
          });

          it('should have a proper value', () => {
            expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).realTime.value.text).to.equal(
              getBooleanRepresentation(noticePolicy.loanNotices[0].realTime)
            );
          });

          it('should have a proper label', () => {
            expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).realTime.label.text).to.equal(
              translation['settings.noticePolicy.notices.realTime']
            );
          });
        });
      });

      describe('send every', () => {
        describe('notice policy\n\t\t-Recurring', () => {
          let patronNoticeTemplate;
          let noticePolicy;

          beforeEach(function () {
            patronNoticeTemplate = this.server.create('templates', { category: 'Loan' });
            noticePolicy = this.server.create('patronNoticePolicy', {
              active: true,
              loanNotices: [{
                name: 'mockName',
                templateId: patronNoticeTemplate.id,
                templateName: 'mockTemplateName',
                format: 'Email',
                frequency: 'Recurring',
                realTime: true,
                sendOptions: {
                  sendHow: 'After',
                  sendWhen: 'Due date',
                  sendBy: {
                    duration: 2,
                    intervalId: 'Hours'
                  },
                  sendEvery: {
                    duration: 2,
                    intervalId: 'Hours'
                  }
                }
              }],
            });

            this.visit(`/settings/circulation/notice-policies/${noticePolicy.id}`);
          });

          describe('duration', () => {
            it('should be displayed', () => {
              expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).sendEveryDuration.isPresent).to.be.true;
            });

            it('should have a proper value', () => {
              expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).sendEveryDuration.text).to.equal(
                noticePolicy.loanNotices[0].sendOptions.sendEvery.duration.toString()
              );
            });
          });

          describe('interval', () => {
            it('should be displayed', () => {
              expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).sendEveryIntervalId.isPresent).to.be.true;
            });

            it('should have a proper value', () => {
              expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).sendEveryIntervalId.text).to.equal(
                translation[
                  `settings.noticePolicy.notices.${noticePolicy.loanNotices[0].sendOptions.sendEvery.intervalId.toLowerCase()}`
                ]
              );
            });
          });
        });

        describe('notice policy\n\t\t-One time', () => {
          let patronNoticeTemplate;
          let noticePolicy;

          beforeEach(function () {
            patronNoticeTemplate = this.server.create('templates', { category: 'Loan' });
            noticePolicy = this.server.create('patronNoticePolicy', {
              active: true,
              loanNotices: [{
                name: 'mockName',
                templateId: patronNoticeTemplate.id,
                templateName: 'mockTemplateName',
                format: 'Email',
                frequency: 'One Time',
                realTime: true,
                sendOptions: {
                  sendHow: 'After',
                  sendWhen: 'Due date',
                  sendBy: {
                    duration: 2,
                    intervalId: 'Hours'
                  },
                  sendEvery: {
                    duration: 2,
                    intervalId: 'Hours'
                  }
                }
              }],
            });

            this.visit(`/settings/circulation/notice-policies/${noticePolicy.id}`);
          });

          describe('duration', () => {
            it('should not be displayed', () => {
              expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).sendEveryDuration.isPresent).to.be.false;
            });
          });

          describe('interval', () => {
            it('should not be displayed', () => {
              expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).sendEveryIntervalId.isPresent).to.be.false;
            });
          });
        });
      });

      describe('send by', () => {
        describe('notice policy\n\t\t-send After', () => {
          let patronNoticeTemplate;
          let noticePolicy;

          beforeEach(function () {
            patronNoticeTemplate = this.server.create('templates', { category: 'Loan' });
            noticePolicy = this.server.create('patronNoticePolicy', {
              active: true,
              loanNotices: [{
                name: 'mockName',
                templateId: patronNoticeTemplate.id,
                templateName: 'mockTemplateName',
                format: 'Email',
                frequency: 'Recurring',
                realTime: true,
                sendOptions: {
                  sendHow: 'After',
                  sendWhen: 'Due date',
                  sendBy: {
                    duration: 2,
                    intervalId: 'Hours'
                  },
                  sendEvery: {
                    duration: 2,
                    intervalId: 'Hours'
                  }
                }
              }],
            });

            this.visit(`/settings/circulation/notice-policies/${noticePolicy.id}`);
          });

          it('should have a proper label', () => {
            expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).byText).to.equal(
              translation['settings.noticePolicy.notices.by']
            );
          });

          describe('duration', () => {
            it('should be displayed', () => {
              expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).sendByDuration.isPresent).to.be.true;
            });

            it('should have a proper value', () => {
              expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).sendByDuration.text).to.equal(
                noticePolicy.loanNotices[0].sendOptions.sendBy.duration.toString()
              );
            });
          });

          describe('interval', () => {
            it('should be displayed', () => {
              expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).sendByIntervalId.isPresent).to.be.true;
            });

            it('should have a proper value', () => {
              expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).sendByIntervalId.text).to.equal(
                translation[
                  `settings.noticePolicy.notices.${noticePolicy.loanNotices[0].sendOptions.sendBy.intervalId.toLowerCase()}`
                ]
              );
            });
          });
        });

        describe('notice policy\n\t\t-send Before', () => {
          let patronNoticeTemplate;
          let noticePolicy;

          beforeEach(function () {
            patronNoticeTemplate = this.server.create('templates', { category: 'Loan' });
            noticePolicy = this.server.create('patronNoticePolicy', {
              active: true,
              loanNotices: [{
                name: 'mockName',
                templateId: patronNoticeTemplate.id,
                templateName: 'mockTemplateName',
                format: 'Email',
                frequency: 'Recurring',
                realTime: true,
                sendOptions: {
                  sendHow: 'Before',
                  sendWhen: 'Due date',
                  sendBy: {
                    duration: 2,
                    intervalId: 'Hours'
                  },
                  sendEvery: {
                    duration: 2,
                    intervalId: 'Hours'
                  }
                }
              }],
            });

            this.visit(`/settings/circulation/notice-policies/${noticePolicy.id}`);
          });

          it('should have a proper label', () => {
            expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).byText).to.equal(
              translation['settings.noticePolicy.notices.by']
            );
          });

          describe('duration', () => {
            it('should be displayed', () => {
              expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).sendByDuration.isPresent).to.be.true;
            });

            it('should have a proper value', () => {
              expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).sendByDuration.text).to.equal(
                noticePolicy.loanNotices[0].sendOptions.sendBy.duration.toString()
              );
            });
          });

          describe('interval', () => {
            it('should be displayed', () => {
              expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).sendByIntervalId.isPresent).to.be.true;
            });

            it('should have a proper value', () => {
              expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).sendByIntervalId.text).to.equal(
                translation[
                  `settings.noticePolicy.notices.${noticePolicy.loanNotices[0].sendOptions.sendBy.intervalId.toLowerCase()}`
                ]
              );
            });
          });
        });

        describe('notice policy\n\t\t-send Upon at', () => {
          let patronNoticeTemplate;
          let noticePolicy;

          beforeEach(function () {
            patronNoticeTemplate = this.server.create('templates', { category: 'Loan' });
            noticePolicy = this.server.create('patronNoticePolicy', {
              active: true,
              loanNotices: [{
                name: 'mockName',
                templateId: patronNoticeTemplate.id,
                templateName: 'mockTemplateName',
                format: 'Email',
                frequency: 'Recurring',
                realTime: true,
                sendOptions: {
                  sendHow: 'Upon at',
                  sendWhen: 'Due date',
                  sendBy: {
                    duration: 2,
                    intervalId: 'Hours'
                  },
                  sendEvery: {
                    duration: 2,
                    intervalId: 'Hours'
                  }
                }
              }],
            });

            this.visit(`/settings/circulation/notice-policies/${noticePolicy.id}`);
          });

          describe('duration', () => {
            it('should not be displayed', () => {
              expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).sendByDuration.isPresent).to.be.false;
            });
          });

          describe('interval', () => {
            it('should not be displayed', () => {
              expect(NoticePolicyDetail.loanNoticesSection.loanNotices(0).sendByIntervalId.isPresent).to.be.false;
            });
          });
        });
      });
    });
  });
});
