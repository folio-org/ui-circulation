import { expect } from 'chai';
import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';

import translation from '../../../../translations/ui-circulation/en';
import setupApplication from '../../helpers/setup-application';
import NoticePolicyForm from '../../interactors/notice-policy/notice-policy-form';
import { getRequiredLabel } from '../../helpers/messageСonverters';

describe('NoticePolicyForm', () => {
  setupApplication();

  describe('\n\taccordions\n', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/notice-policies?layer=add');
    });

    it('should be displayed', () => {
      expect(NoticePolicyForm.expandAll.isPresent).to.be.true;
    });

    describe('\n\tcollapse all\n', () => {
      beforeEach(async () => {
        await NoticePolicyForm.expandAll.click();
      });

      it('generalSection should not be displayed', () => {
        expect(NoticePolicyForm.generalSection.content.isHidden).to.be.true;
      });

      it('loanNoticesSection should not be displayed', () => {
        expect(NoticePolicyForm.loanNoticesSection.content.isHidden).to.be.true;
      });

      it('requestNoticesSection should not be displayed', () => {
        expect(NoticePolicyForm.requestNoticesSection.content.isHidden).to.be.true;
      });

      describe('\n\texpand all\n', () => {
        beforeEach(async () => {
          await NoticePolicyForm.expandAll.click();
        });

        it('generalSection should be displayed', () => {
          expect(NoticePolicyForm.generalSection.content.isVisible).to.be.true;
        });

        it('loanNoticesSection should be displayed', () => {
          expect(NoticePolicyForm.loanNoticesSection.content.isVisible).to.be.true;
        });

        it('requestNoticesSection should be displayed', () => {
          expect(NoticePolicyForm.requestNoticesSection.content.isVisible).to.be.true;
        });
      });
    });
  });

  describe('create a new notice policy', () => {
    beforeEach(async function () {
      this.visit('/settings/circulation/notice-policies?layer=add');
    });

    describe('general section', () => {
      it('should be displayed', () => {
        expect(NoticePolicyForm.generalSection.isPresent).to.be.true;
      });

      describe('policy name', () => {
        it('should be displayed', () => {
          expect(NoticePolicyForm.generalSection.policyName.isPresent).to.be.true;
        });

        it('should have proper text', () => {
          expect(NoticePolicyForm.generalSection.policyName.text).to.equal(
            getRequiredLabel(translation['settings.loanPolicy.policyName'])
          );
        });
      });

      describe('active', () => {
        it('should be displayed', () => {
          expect(NoticePolicyForm.generalSection.active.isPresent).to.be.true;
        });

        it('should have proper text', () => {
          expect(NoticePolicyForm.generalSection.active.text).to.equal(
            translation['settings.patronNotices.notice.active']
          );
        });
      });

      describe('policy description', () => {
        it('should be displayed', () => {
          expect(NoticePolicyForm.generalSection.policyDescription.isPresent).to.be.true;
        });

        it('should have proper text', () => {
          expect(NoticePolicyForm.generalSection.policyDescription.text).to.equal(
            translation['settings.loanPolicy.policyDescription']
          );
        });
      });
    });

    describe('loans section', () => {
      it('should be presented', () => {
        expect(NoticePolicyForm.loanNoticesSection.isPresent).to.be.true;
      });

      it('should should have 0 notice cards', () => {
        expect(NoticePolicyForm.loanNoticesSection.hasCards).to.be.false;
      });

      describe('add one card', () => {
        beforeEach(async () => {
          await NoticePolicyForm.loanNoticesSection.addCard();
        });

        it('should have 1 notice cards', () => {
          expect(NoticePolicyForm.loanNoticesSection.hasCards).to.be.true;
        });

        describe('notice card', () => {
          describe('templateId', () => {
            it('should be displayed', () => {
              expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).templateId.hasSelect).to.be.true;
            });

            it('should have proper label', () => {
              expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).templateId.label).to.be.equal(
                getRequiredLabel(translation['settings.noticePolicy.notices.template'])
              );
            });
          });

          describe('via text', () => {
            it('should be displayed', () => {
              expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).viaText.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).viaText.text).to.be.equal(
                translation['settings.noticePolicy.notices.via']
              );
            });
          });

          describe('format', () => {
            it('should should be displayed', () => {
              expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).format.hasSelect).to.be.true;
            });

            it('should have proper label', () => {
              expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).format.label).to.be.equal(
                getRequiredLabel(translation['settings.noticePolicy.notices.format'])
              );
            });
          });

          describe('frequency', () => {
            it('should be displayed', () => {
              expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).frequency.hasSelect).to.be.true;
            });

            it('should have proper label', () => {
              expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).frequency.label).to.be.equal(
                getRequiredLabel(translation['settings.noticePolicy.notices.frequency'])
              );
            });
          });

          describe('event label', () => {
            describe('-Frequency: recurring', () => {
              beforeEach(async () => {
                await NoticePolicyForm.loanNoticesSection.loanNotices(0).frequency.selectAndBlur('Recurring');
              });

              it('should be displayed', () => {
                expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).eventLabel.isPresent).to.be.true;
              });

              it('should have proper text', () => {
                expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).eventLabel.text).to.be.equal(
                  getRequiredLabel(translation['settings.noticePolicy.notices.startigSendEvent'])
                );
              });
            });

            describe('-Frequency: one time', () => {
              beforeEach(async () => {
                await NoticePolicyForm.loanNoticesSection.loanNotices(0).frequency.selectAndBlur('One Time');
              });

              it('should be displayed', () => {
                expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).eventLabel.isPresent).to.be.true;
              });

              it('should have proper text', () => {
                expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).eventLabel.text).to.be.equal(
                  getRequiredLabel(translation['settings.noticePolicy.notices.sendEvent'])
                );
              });
            });

            describe('send how', () => {
              it('should be displayed', () => {
                expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.hasSelect).to.be.true;
              });
            });

            describe('send when', () => {
              it('should be displayed', () => {
                expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendWhen.hasSelect).to.be.true;
              });
            });

            describe('sendByLabel', () => {
              describe('-send: Upon At', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('Upon/At');
                });

                it('should not be displayed', () => {
                  expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendByLabel.isPresent).to.be.false;
                });
              });

              describe('-send: Before', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('Before');
                });

                it('should be displayed', () => {
                  expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendByLabel.isPresent).to.be.true;
                });

                it('should have proper text', () => {
                  expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendByLabel.text).to.be.equal(
                    translation['settings.noticePolicy.notices.by']
                  );
                });
              });

              describe('-send: After', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('After');
                });

                it('should be displayed', () => {
                  expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendByLabel.isPresent).to.be.true;
                });

                it('should have proper text', () => {
                  expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendByLabel.text).to.be.equal(
                    translation['settings.noticePolicy.notices.by']
                  );
                });
              });
            });

            describe('sendByDuration', () => {
              describe('-send: Upon At', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('Upon/At');
                });

                it('should not be displayed', () => {
                  expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendByDuration.hasSelect).to.be.false;
                });
              });

              describe('-send: Before', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('Before');
                });

                it('should be displayed', () => {
                  expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendByDuration.hasSelect).to.be.true;
                });
              });

              describe('-send: After', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('After');
                });

                it('should be displayed', () => {
                  expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendByDuration.hasSelect).to.be.true;
                });
              });
            });

            describe('sendByIntervalId', () => {
              describe('-send: Upon At', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('Upon/At');
                });

                it('should not be displayed', () => {
                  expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendByIntervalId.hasSelect).to.be.false;
                });
              });

              describe('-send: Before', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('Before');
                });

                it('should be displayed', () => {
                  expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendByIntervalId.hasSelect).to.be.true;
                });
              });

              describe('-send: After', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('After');
                });

                it('should be displayed', () => {
                  expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendByIntervalId.hasSelect).to.be.true;
                });
              });
            });

            describe('sendEveryDuration', () => {
              describe('-Frequency: recurring', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).frequency.selectAndBlur('Recurring');
                });

                it('should be displayed', () => {
                  expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendEveryDuration.isPresent).to.be.true;
                });
              });

              describe('-Frequency: one time', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).frequency.selectAndBlur('One Time');
                });

                it('should not be displayed', () => {
                  expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendEveryDuration.isPresent).to.be.false;
                });
              });
            });

            describe('sendEveryIntervalId', () => {
              describe('-Frequency: recurring', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).frequency.selectAndBlur('Recurring');
                });

                it('should be displayed', () => {
                  expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendEveryIntervalId.isPresent).to.be.true;
                });
              });

              describe('-Frequency: one time', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).frequency.selectAndBlur('One Time');
                });

                it('should not be displayed', () => {
                  expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendEveryIntervalId.isPresent).to.be.false;
                });
              });
            });

            describe('sendEveryLabel', () => {
              describe('-Frequency: recurring', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).frequency.selectAndBlur('Recurring');
                });

                it('should be displayed', () => {
                  expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendEveryLabel.isPresent).to.be.true;
                });

                it('should have proper text', () => {
                  expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendEveryLabel.text).to.be.equal(
                    getRequiredLabel(translation['settings.noticePolicy.notices.sendEvery'])
                  );
                });
              });

              describe('-Frequency: one time', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).frequency.selectAndBlur('One Time');
                });

                it('should not be displayed', () => {
                  expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendEveryLabel.isPresent).to.be.false;
                });
              });
            });

            describe('real time', () => {
              it('should be displayed', () => {
                expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).realTime.isPresent).to.be.true;
              });

              it('should have proper label', () => {
                expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).realTime.text).to.be.equal(
                  translation['settings.noticePolicy.notices.realTime']
                );
              });
            });
          });
        });
      });
    });

    describe('request section', () => {
      it('should be presented', () => {
        expect(NoticePolicyForm.requestNoticesSection.isPresent).to.be.true;
      });

      it('should should have 0 notice cards', () => {
        expect(NoticePolicyForm.requestNoticesSection.hasCards).to.be.false;
      });

      describe('add one card', () => {
        beforeEach(async () => {
          await NoticePolicyForm.requestNoticesSection.addCard();
        });

        it('should have 1 notice cards', () => {
          expect(NoticePolicyForm.requestNoticesSection.hasCards).to.be.true;
        });
      });

      describe('add two cards', () => {
        beforeEach(async () => {
          await NoticePolicyForm.requestNoticesSection.addCard();
          await NoticePolicyForm.requestNoticesSection.addCard();
        });

        it('should have notice cards', () => {
          expect(NoticePolicyForm.requestNoticesSection.hasCards).to.be.true;
        });

        it('should have 2 notice cards', () => {
          expect(NoticePolicyForm.requestNoticesSection.cardsCount).to.be.equal(2);
        });
      });
    });
  });
});
